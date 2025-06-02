import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import { Services, type ServiceProps } from "../services/data";
import { storage } from "../utils/storage.util";
import { ROUTES } from "../routes/constants";
import { toast } from "react-toastify";

type LoginCredentialProps = ServiceProps["AuthProps"]["LoginCredentialProps"];

export interface LoginResponseProps {
    token: string | null;
    user: {
        uuid: string | null;
        name: string | null;
    };
}

const DEFAULT_USER_DATA: LoginResponseProps = {
    token: null,
    user: { uuid: null, name: null },
};

interface AuthContextProps {
    isAuthenticated: boolean;
    data: LoginResponseProps;
    handleLogin: (
        data: LoginCredentialProps
    ) => Promise<LoginResponseProps | undefined>;
    handleLogout(): void;
    setUser: Dispatch<SetStateAction<LoginResponseProps>>;
}

const AuthContext = createContext({} as AuthContextProps);

export function handleUnauthorized(route = ROUTES.auth.login) {
    toast.info('Sessão Expirada! Faça o Login Novamente')
    window.location.href = route;
    storage.clear();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const userDataFromStorage = storage.get<LoginResponseProps>(
        storage.KEY.USER
    );
    const [user, setUser] = useState(userDataFromStorage || DEFAULT_USER_DATA);

    async function handleLogin(data: LoginCredentialProps) {
        storage.remove(storage.KEY.USER);

        try {
            const response = await Services.Auth.api.login({
                email: data.email,
                password: data.password,
            });

            setUser(response);

            storage.set(storage.KEY.USER, response);

            return response as LoginResponseProps;
        } catch {
            return;
        }
    }

    function handleLogout() {
        storage.clear();
        setUser(DEFAULT_USER_DATA);
    }

    return (
        <AuthContext.Provider
            value={{
                data: user,
                isAuthenticated: !!user?.token,
                handleLogin,
                handleLogout,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

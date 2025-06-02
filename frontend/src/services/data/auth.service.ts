import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { API } from "../api.service";
import { apiRoutes } from "../api-routes.service";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Insira um email válido"),
    password: z
        .string()
        .min(6, "Use uma senha de no mínimo 6 dígitos")
        .max(12, "Use uma senha de no maximo 12 dígitos"),
});

type LoginCredentialProps = z.infer<typeof loginSchema>;

const resolver = {
    login: zodResolver(loginSchema),
};

class Authenticate {
    async login(data: LoginCredentialProps) {
        const response = await API.post(apiRoutes.login, data);
        API.defaults.headers[
            "Authorization"
        ] = `Bearer ${response.data?.token}`;
        return response.data;
    }
}

export const Auth = {
    api: new Authenticate(),
    resolver,
};

export type AuthProps = {
    LoginCredentialProps: LoginCredentialProps;
};

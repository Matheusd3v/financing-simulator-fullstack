import { Navigate, Outlet } from "react-router-dom";
import { hook } from "../contexts";
import type { PropsWithChildren } from "react";

interface Props {
    redirectPath?: string;
}

export function ProtectedRoute({
    redirectPath = "/",
}: PropsWithChildren<Props>) {
    const { isAuthenticated } = hook.useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}

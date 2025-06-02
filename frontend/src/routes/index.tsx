import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider as Provider,
    Outlet,
} from "react-router-dom";
import Home from "../features/pages/home";
import { Suspense } from "react";
import { ROUTES } from "./constants";
import PageTransition from "../components/page-transition";
import Register from "../features/pages/register";
import Navbar from "../components/navbar";
import Login from "../features/pages/login";
import { ProtectedRoute } from "./protectedRoute";
import Dashboard from "../features/pages/dashboard";
import Profile from "../features/pages/profile";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <PageTransition>
                            <Home />
                        </PageTransition>
                    }
                />
                <Route
                    path={ROUTES.register}
                    element={
                        <PageTransition>
                            <Register />
                        </PageTransition>
                    }
                />
                <Route
                    path={ROUTES.auth.login}
                    element={
                        <PageTransition>
                            <Login />
                        </PageTransition>
                    }
                />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.dashboard} element={<Dashboard />} />
                <Route path={ROUTES.student.profile} element={<Profile />} />
            </Route>
        </>
    )
);

export function RouterProvider() {
    return (
        <Suspense>
            <Provider router={router} />
        </Suspense>
    );
}

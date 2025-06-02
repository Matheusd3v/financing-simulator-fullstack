export const apiRoutes = {
    login: "/login",
    student: {
        register: "/register",
        find: "/me",
        update: "/me",
    },
    simulation: {
        create: "/simulations",
        get: "/simulations",
        delete: (uuid: string) => `/simulations/${uuid}`,
        update: (uuid: string) => `/simulations/${uuid}`,
    },
};

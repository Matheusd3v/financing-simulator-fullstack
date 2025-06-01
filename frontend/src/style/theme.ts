import type { DefaultTheme } from "styled-components";

export const mainTheme: DefaultTheme = {
    primary: "#004851",
    secondary: "#d9faf6",
    white: "#ffffff",
    maxWidth: "1500px",
    button: {
        borderRadius: "6px",
        fontWeight: 500,
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        transition: "background 0.2s, box-shadow 0.2s",
        focusRing: "0 0 0 2px",
        height: {
            max: "54px",
            medium: "47px",
            small: "40px",
        },
    },
};

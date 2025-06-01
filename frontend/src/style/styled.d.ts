import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        secondary: string;
        primary: string;
        white: string;
        maxWidth: string;
        button: {
            borderRadius: string;
            fontWeight: number;
            padding: string;
            fontSize: string;
            transition: string;
            focusRing: string;
            height: {
                max: string;
                medium: string;
                small: string;
            }
        };
    }
}

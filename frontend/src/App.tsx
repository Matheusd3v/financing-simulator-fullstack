import { ThemeProvider } from "styled-components";
import { mainTheme } from "./style/theme";
import { RouterProvider } from "./routes";
import { Context } from "./contexts";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={mainTheme}>
                <Context.AuthProvider>
                    <RouterProvider />
                </Context.AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;

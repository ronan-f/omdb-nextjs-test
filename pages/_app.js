import { UserProvider } from "@auth0/nextjs-auth0"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import appTheme from "../styles/theme"
import "../styles/globals.css"
import { QueryClientProvider, QueryClient } from "react-query"

const theme = createMuiTheme(appTheme)
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap"
                />
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}

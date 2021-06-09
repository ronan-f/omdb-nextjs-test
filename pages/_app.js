import { UserProvider } from "@auth0/nextjs-auth0";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import appTheme from '../styles/theme';

const theme = createMuiTheme(appTheme);

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap" />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </UserProvider>
    )
}

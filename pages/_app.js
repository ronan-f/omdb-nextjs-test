import { UserProvider } from "@auth0/nextjs-auth0";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import appTheme from '../styles/theme';

const theme = createMuiTheme(appTheme);

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </UserProvider>
    )
}

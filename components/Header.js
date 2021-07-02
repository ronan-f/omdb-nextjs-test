import { useUser } from "@auth0/nextjs-auth0"
import { Logout } from "./Logout"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export const Header = () => {
    return (
        <NavBar>
            <Logout />
        </NavBar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));



const Greeting = () => {
    const classes = useStyles();
    const { error, loading, user } = useUser()
    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no...{error.message}</p>

    return <Typography variant="h6" className={classes.title}>
        Hi {user.name}
    </Typography>
}



const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Greeting />
                    <Logout />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;

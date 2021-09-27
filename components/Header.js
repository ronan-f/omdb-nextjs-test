import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"
import { Logout } from "./Logout"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import HomeIcon from "@material-ui/icons/Home"
import { Button } from "@material-ui/core"

export const Header = () => {
    return (
        <NavBar>
            <Logout />
        </NavBar>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    home: {
        margin: "0 1rem",
    },
    greeting: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
}))

const Greeting = () => {
    const { error, loading, user } = useUser()
    if (loading || !user) return <p>Loading...</p>
    if (error) return <p>Oh no...{error.message}</p>

    return <Typography variant="body1">Hi {user.name}</Typography>
}

const Home = () => {
    const classes = useStyles()

    return (
        <Button color="inherit">
            <Link href="/home">
                <HomeIcon className={classes.home} />
            </Link>
        </Button>
    )
}

const NavBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.greeting}>
                        <Home />
                        <Greeting />
                    </div>
                    <Logout />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar

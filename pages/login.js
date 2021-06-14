import Head from "next/head"
import Link from "next/link"
import { auth } from "../constants"
import { Container } from "../components/Container"
import { Button } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';

const Login = () => {
    return (
        <>
            <Head>
                <title>TGAP Movies</title>
                <meta
                    name="description"
                    content="Random movie app using OMDB API"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <LoginDialog />
            </Container>
        </>
    )
}

export default Login

const LoginDialog = () => {
    return (
        <div>
            <Typography variant="h2">
                Welcome to The Great & Powerful Movies App 🎬
            </Typography>
            <Typography variant="h3">
                Login to get started
            </Typography>
            <br></br>
            <Link href={auth.LOGIN}>
                <Button variant="contained" color="primary" >Login</Button>
            </Link>
        </div>
    )
}

import Head from "next/head"
import Link from "next/link"
import { auth } from "../constants"
import { Container } from "../components/Container"
import { Button } from "@material-ui/core"

const Login = () => {
    return (
        <Container>
            <Head>
                <title>Movies App</title>
                <meta
                    name="description"
                    content="Random movie app using OMDB API"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <LoginDialog />
        </Container>
    )
}

export default Login

const LoginDialog = () => {
    return (
        <div>
            <h1>Welcome to Movies App</h1>
            <p>Login to get started</p>

            <Link href={auth.LOGIN}>
                <Button variant="contained">Login</Button>
            </Link>
        </div>
    )
}

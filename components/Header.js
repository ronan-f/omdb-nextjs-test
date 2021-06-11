import { useUser } from "@auth0/nextjs-auth0"
import { Container } from "./Container"
import { Logout } from "./Logout"
import Typography from '@material-ui/core/Typography';

export const Header = () => {
    return (
        <Container>
            <Welcome />
            <Logout />
        </Container>
    )
}

const Welcome = () => {
    const { error, loading, user } = useUser()
    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no...{error.message}</p>

    return (
        <Typography variant="h5">
            Hello {user.name}.
        </Typography>
    )
}

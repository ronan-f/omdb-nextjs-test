import { Header } from "./Header"
import { Container } from "./Container"

export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container children={children} />
        </>
    )
}

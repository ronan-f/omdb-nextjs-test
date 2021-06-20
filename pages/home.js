import { useUser } from "@auth0/nextjs-auth0"
import { Layout } from "../components/Layout"
import SearchBar from "../components/SearchBar"
import { LoadingIndicator } from "../components/LoadingIndicator"

const Home = () => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <LoadingIndicator fullScreen />
    if (error) return <p>Oh no my error: {error.message}</p>

    if (user) {
        return (
            <Layout>
                <main>
                    <SearchBar />
                </main>
            </Layout>
        )
    }
}

export default Home

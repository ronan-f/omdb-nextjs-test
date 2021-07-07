import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Layout } from "../components/Layout"
import SearchBar from "../components/SearchBar"
import ReviewFeed from "../components/ReviewFeed"
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
                    <ReviewFeed />
                </main>
            </Layout>
        )
    }
}

export default withPageAuthRequired(Home)

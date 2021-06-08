import { useUser } from "@auth0/nextjs-auth0"
import { Movie } from "../components/Movie"
import { useSearchMovies } from "../hooks/useSearchMovies"
import styles from "../styles/Home.module.css"
import { Layout } from "../components/Layout"

const Home = ({ movies }) => {
    const { user, error, isLoading } = useUser()

    if (!movies || !movies.length) return <p>Oh no..my movies</p>

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Oh no my error: {error.message}</p>

    if (user) {
        return (
            <Layout>
                <main>
                    <MoviesContainer movies={movies} />
                </main>
            </Layout>
        )
    }
}

const MoviesContainer = ({ movies }) => {
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Movie key={movie.imdbID} {...movie} />
            ))}
        </div>
    )
}

export async function getStaticProps() {
    const data = (await useSearchMovies("star wars")) || []

    return {
        props: {
            movies: data.Search.slice(0, 10),
        },
    }
}

export default Home

import { useUser } from "@auth0/nextjs-auth0"
import { Movie } from "../components/Movie"
import { useSearchMovies } from "../hooks/useSearchMovies"
import styles from "../styles/Home.module.css"
import { Layout } from "../components/Layout"
import SearchBar from "../components/SearchBar"
import { useState } from "react"

const Home = () => {
    const { user, error, isLoading } = useUser()
    const [movies, setMovies] = useState([])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Oh no my error: {error.message}</p>

    const handleSearch = async (e) => {
        if (e.target.value && e.code === "Enter") {
            const result = await useSearchMovies(e.target.value)

            if (result) {
                setMovies(result.data.slice(0, 10))
            }
        }
    }

    if (user) {
        return (
            <Layout>
                <main>
                    <SearchBar handleSearch={handleSearch} />

                    {movies && <MoviesContainer movies={movies} />}
                </main>
            </Layout>
        )
    }
}

const MoviesContainer = ({ movies }) => {
    if (!movies) return
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Movie key={movie.imdbID} {...movie} />
            ))}
        </div>
    )
}

export default Home

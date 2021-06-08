import Head from "next/head"
import { Movie } from "../components/Movie"
import styles from "../styles/Home.module.css"
import { useSearchMovies } from "../hooks/useSearchMovies"

export default function Home({ movies }) {
    if (!movies || !movies.length) {
        return <h1>Oh no my movies...</h1>
    }

    return (
        <div>
            <Head>
                <title>Movies App</title>
                <meta
                    name="description"
                    content="Random movie app using OMDB API"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome to the Movies App Here</h1>
                <div className={styles.container}>
                    {movies.map((movie) => (
                        <Movie {...movie} />
                    ))}
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    const data = await useSearchMovies("star wars")

    return {
        props: {
            movies: data.Search.slice(0, 10),
        },
    }
}

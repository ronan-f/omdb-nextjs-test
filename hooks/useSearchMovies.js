import { config } from "../config"

export const useSearchMovies = async (movieTitle) => {
    const res = await fetch(
        `http://www.omdbapi.com/?s=${paramified(
            movieTitle
        )}&page=1&type=movie&r=json&apikey=${config.OMDB_API_KEY}`
    )

    return res && res.json()
}

const paramified = (title) => {
    return title.split(" ").join("+")
}

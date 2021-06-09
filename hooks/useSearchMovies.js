const { server } = require("../config")

export const useSearchMovies = async (movieTitle) => {
    let res = await fetch(`${server}/api/movies/search`, {
        method: "POST",
        body: JSON.stringify({
            movie: movieTitle,
        }),
    })

    return res && res.json()
}

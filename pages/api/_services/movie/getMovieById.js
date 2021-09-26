import { config } from "../../../../config"

export async function getMovieById(id) {
    if (!id) return

    let result

    try {
        result = await fetch(
            `http://www.omdbapi.com/?i=${id}&r=json&apikey=${config.OMDB_API_KEY}`
        )
    } catch (e) {
        console.error(e)
        result = null
    }

    return await result.json()
}

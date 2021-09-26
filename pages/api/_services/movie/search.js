import { config } from "../../../../config"

export async function search(title) {
    if (!title) return

    let result

    try {
        result = await fetch(
            `http://www.omdbapi.com/?s=${paramified(
                title
            )}&page=1&type=movie&r=json&apikey=${config.OMDB_API_KEY}`
        )
    } catch (e) {
        console.error(e)
        result = null
    }

    return result && (await result.json())
}

function paramified(title) {
    if (!title) return

    return title.split(" ").join("+")
}

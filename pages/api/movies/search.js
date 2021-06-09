import { formatResponse } from "../_helpers/formatResponse"
import { config } from "../../../config"

export default async function moviesHandler(req, res) {
    const { method, body } = req

    const parsedBody = JSON.parse(body)

    if (method !== "POST")
        return res
            .status(405)
            .json(formatResponse(false, 405, `Method ${method} not allowed`))

    if (!parsedBody.movie) {
        return res
            .status(400)
            .json(
                formatResponse(
                    false,
                    400,
                    "Request must include movie term to search"
                )
            )
    }

    let result = await fetch(
        `http://www.omdbapi.com/?s=${paramified(
            parsedBody.movie
        )}&page=1&type=movie&r=json&apikey=${config.OMDB_API_KEY}`
    )

    if (!result || !result.json) {
        return res
            .status(404)
            .json(
                formatResponse(
                    false,
                    404,
                    `Nothing found for query ${parsedBody.movie}`
                )
            )
    }

    result = await result.json()

    return res.status(200).json(formatResponse(true, 200, result.Search))
}

const paramified = (title) => {
    return title.split(" ").join("+")
}

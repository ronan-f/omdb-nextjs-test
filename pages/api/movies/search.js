import { formatResponse } from "../_helpers/formatResponse"
import { config } from "../../../config"
import nc from "next-connect"
import authenticateRequest from "../_middleware/auth"
import { parseBody, validateParams } from "../_middleware/validation/movies"

const handler = nc()
    .use(authenticateRequest)
    .use(parseBody)
    .use(validateParams)
    .post(moviesHandler)

export default handler

export async function moviesHandler(_, res) {
    const { parsedBody } = res.locals

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

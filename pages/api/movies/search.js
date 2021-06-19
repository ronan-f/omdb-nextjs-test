import { formatResponse } from "../_helpers/formatResponse"
import { config } from "../../../config"
import nc from "next-connect"
import { parseBody, validateParams } from "../_middleware/validation/movies"
import { withApiAuthRequired } from "@auth0/nextjs-auth0"

const handler = nc().use(parseBody).use(validateParams).post(moviesHandler)

export default withApiAuthRequired(handler)

async function moviesHandler(_, res) {
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

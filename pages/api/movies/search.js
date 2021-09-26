import { formatResponse } from "../_helpers/formatResponse"
import nc from "next-connect"
import { parseBody, validateParams } from "../_middleware/validation/movies"
import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { search } from "../_services/movie/search"

const handler = nc().use(parseBody).use(validateParams).post(moviesHandler)

export default withApiAuthRequired(handler)

export async function moviesHandler(_, res) {
    const { parsedBody } = res.locals

    const result = await search(parsedBody.movie)

    if (!result) {
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

    return res.status(200).json(formatResponse(true, 200, result.Search))
}

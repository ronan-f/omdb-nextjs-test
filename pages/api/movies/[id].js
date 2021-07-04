import { formatResponse } from "../_helpers/formatResponse"
import { config } from "../../../config"
import nc from "next-connect"
import { withApiAuthRequired } from "@auth0/nextjs-auth0"

const handler = nc().get(movieHandler)

export default withApiAuthRequired(handler)

export async function movieHandler(req, res) {
    const { id: movieId } = req.query;

    if (!movieId) {
        return res
            .status(400)
            .json(
                formatResponse(
                    false,
                    400,
                    'No movie ID provided'
                )
            )
    }

    let result = await fetch(
        `http://www.omdbapi.com/?i=${movieId}&type=movie&r=json&apikey=${config.OMDB_API_KEY}`
    )

    if (!result || !result.json) {
        return res
            .status(404)
            .json(
                formatResponse(
                    false,
                    404,
                    `Nothing found for ID ${movieId}`
                )
            )
    }

    result = await result.json()

    return res.status(200).json(formatResponse(true, 200, result))
}

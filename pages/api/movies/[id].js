import { formatResponse } from "../_helpers/formatResponse"
import nc from "next-connect"
import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { getMovieById } from "../_services/movie/getMovieById"

const handler = nc().get(movieHandler)

export default withApiAuthRequired(handler)

export async function movieHandler(req, res) {
    const { id: movieId } = req.query

    if (!movieId) {
        return res
            .status(400)
            .json(formatResponse(false, 400, "No movie ID provided"))
    }

    const result = await getMovieById(movieId)

    if (!result) {
        return res
            .status(404)
            .json(formatResponse(false, 404, `Nothing found for ID ${movieId}`))
    }

    return res.status(200).json(formatResponse(true, 200, result))
}

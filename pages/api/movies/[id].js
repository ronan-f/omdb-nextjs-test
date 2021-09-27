import { formatResponse } from "../_helpers/formatResponse"
import nc from "next-connect"
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"
import { getMovieById } from "../_services/movie/getMovieById"
import { fetchReview } from "../_services/db/review"
import { withUser } from "../_middleware/withUser"

const handler = nc().use(withUser).get(movieHandler)

export default withApiAuthRequired(handler)

export async function movieHandler(req, res) {
    const { user } = res.locals
    const { id: movieId } = req.query

    if (!movieId) {
        return res
            .status(400)
            .json(formatResponse(false, 400, "No movie ID provided"))
    }

    const promises = [getMovieById(movieId), fetchReview(movieId, user.email)]
    const [movie, review] = await Promise.all(promises)

    if (!movie) {
        return res
            .status(404)
            .json(formatResponse(false, 404, `Nothing found for ID ${movieId}`))
    }

    const response = {
        movie,
        review,
    }

    return res.status(200).json(formatResponse(true, 200, response))
}

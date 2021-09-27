import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { withUser } from "./_middleware/withUser"
import nc from "next-connect"
import { parseBody } from "./_middleware/validation/movies"
import { upsertReview } from "./_services/db/review"

const handler = nc().use(withUser).use(parseBody).post(reviewHandler)

export default withApiAuthRequired(handler)

export async function reviewHandler(req, res) {
    const { parsedBody, user } = res.locals

    const { review, rating, movieId, reviewId } = parsedBody

    const result = await upsertReview(
        review,
        rating,
        user.id,
        movieId,
        reviewId
    )

    return res.status(200).json(result)
}

import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import nc from "next-connect"
import { fetchReviews } from "./_services/db/reviews"
import { formatReviews } from "./_helpers/reviews"

const handler = nc().get(reviewsHandler)

export default withApiAuthRequired(handler)

export async function reviewsHandler(req, res) {
    const reviews = await fetchReviews(5).then(formatReviews)

    if (!reviews) return res.status(404).send()

    return res.status(200).json(reviews)
}

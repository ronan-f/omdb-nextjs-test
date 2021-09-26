import { useEffect, useState } from "react"
import useGetReviews from "../hooks/useGetReviews"
import ReviewCard from "./ReviewCard"
import { LoadingIndicator } from "./LoadingIndicator"

const ReviewFeed = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        useGetReviews()
            .then(setReviews)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingIndicator />
    if (!reviews || !reviews.length)
        return <h1>Hmm...no reviews to show yet.</h1>

    return reviews.map(({ id, ...props }) => {
        return <ReviewCard key={id} {...props} />
    })
}

export default ReviewFeed

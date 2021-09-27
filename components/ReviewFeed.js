import useGetReviews from "../hooks/useGetReviews"
import ReviewCard from "./ReviewCard"
import { LoadingIndicator } from "./LoadingIndicator"

const ReviewFeed = () => {
    const { data, isLoading, isError } = useGetReviews()

    if (isLoading) return <LoadingIndicator />
    if (isError)
        return (
            <h1>
                Error: Something went wrong when fetching reviews. Please try
                again.
            </h1>
        )

    if (!data || !data.length) return <h1>Hmm...no reviews to show yet.</h1>

    return data.map(({ id, ...props }) => {
        return <ReviewCard key={id} {...props} />
    })
}

export default ReviewFeed

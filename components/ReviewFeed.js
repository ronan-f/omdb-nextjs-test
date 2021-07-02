import useGetReviews from '../hooks/useGetReviews'
import ReviewCard from './ReviewCard'

const ReviewFeed = () => {
    const reviews = useGetReviews();

    return reviews.map(({ id, ...props }) => {
        return <ReviewCard key={id} {...props} />
    })
}

export default ReviewFeed;
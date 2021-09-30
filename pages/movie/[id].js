import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Layout } from "../../components/Layout"
import { useGetMovie } from "../../hooks/useGetMovie"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import MovieReviewForm from "../../components/MovieReviewForm"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"

const ReviewMovie = () => {
    const router = useRouter()
    const { id } = router.query
    const [movie, setMovie] = useState(null)
    const [review, setReview] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        setLoading(true)

        useGetMovie(id)
            .then((res) => {
                setMovie(res.data.movie)
                setReview(res.data.review)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <LoadingIndicator fullScreen />
    if (!movie)
        return (
            <h1>
                Hmm...we couldn't find that movie. Try searching for another.
            </h1>
        )

    return (
        <Layout>
            <MovieReviewForm
                hasReviewed={review && review.rating}
                review={review}
                {...movie}
            />
        </Layout>
    )
}

export default withPageAuthRequired(ReviewMovie)

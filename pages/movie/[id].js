import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Layout } from "../../components/Layout"
import { useGetMovie } from "../../hooks/useGetMovie"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import Movie from "../../components/Movie"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"

const ReviewMovie = () => {
    const router = useRouter()
    const { id } = router.query
    const [movie, setMovie] = useState(null)
    const [review, setReview] = useState(null)

    useEffect(() => {
        if (!id) return

        useGetMovie(id)
            .then((res) => {
                setMovie(res.data.movie)
                setReview(res.data.review)
            })
            .catch(console.error)
    }, [id])

    if (!movie) return <LoadingIndicator fullScreen />

    return (
        <Layout>
            <Movie review={review} {...movie} />
        </Layout>
    )
}

export default withPageAuthRequired(ReviewMovie)

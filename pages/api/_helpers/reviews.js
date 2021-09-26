import { formatDistance } from "date-fns"
import { getMovieById } from "../_services/movie/getMovieById"

export async function formatReviews(reviews) {
    let reviewsWithMovies

    try {
        reviewsWithMovies = await withMovies(reviews)
    } catch (e) {
        console.error(e)
        reviewsWithMovies = null
    }

    if (!reviewsWithMovies) return

    return reviewsWithMovies
}

async function withMovies(reviews) {
    if (!reviews) return

    const movies = await getMovies(reviews)

    if (!movies) return

    return reviews.map((review, index) => {
        return {
            ...review,
            created_at: formatReadableDate(review.created_at),
            movie: movies[index],
        }
    })
}

async function getMovies(reviews) {
    if (!reviews) return

    let movies

    const moviePromises = reviews.map((review) => getMovieById(review.movie_id))

    try {
        movies = await Promise.all(moviePromises)
    } catch (e) {
        console.error(e)
        movies = null
    }

    return movies
}

function formatReadableDate(date) {
    return formatDistance(new Date(date), new Date(), {
        addSuffix: true,
    })
}

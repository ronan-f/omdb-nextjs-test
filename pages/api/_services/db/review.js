import client from "../../_helpers/createPrismaClient"

export async function fetchReview(movieId, email) {
    let review

    try {
        review = await client.review.findFirst({
            where: {
                movie_id: movieId,
                author: {
                    email,
                },
            },
        })
    } catch (e) {
        console.error(e)
        review = null
    }

    return review
}

async function createReview(review, rating, author, movieId) {
    return await client.review.create({
        data: {
            author_id: author,
            content: review,
            rating,
            movie_id: movieId,
        },
    })
}

async function updateReview(review, rating, reviewId) {
    return await client.review.update({
        where: {
            id: reviewId,
        },
        data: {
            content: review,
            rating,
        },
    })
}

export async function upsertReview(review, rating, author, movieId, reviewId) {
    if (!rating || !author || !movieId) return

    let result

    try {
        if (reviewId !== undefined && reviewId !== null) {
            result = await updateReview(review, rating, reviewId)
        } else {
            result = await createReview(review, rating, author, movieId)
        }
    } catch (e) {
        console.error(e)
        result = null
    }

    return result
}

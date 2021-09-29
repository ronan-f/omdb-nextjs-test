const { server } = require("../config")

export const useSetReview = async (review = "", rating, movieId, reviewId) => {
    let res

    try {
        res = await fetch(`${server}/api/review`, {
            method: "POST",
            body: JSON.stringify({
                review,
                rating,
                movieId,
                reviewId,
            }),
        })
    } catch (e) {
        console.error(e)
        res = null
    }

    return res && res.json()
}

import client from "../../_helpers/createPrismaClient"

export async function fetchReviews(count) {
    let reviews
    try {
        reviews = await client.review.findMany({
            take: count,
            include: {
                author: true,
            },
            orderBy: {
                updated_at: "desc",
            },
        })
    } catch (e) {
        reviews = null
    }

    return reviews
}

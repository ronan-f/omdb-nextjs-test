import client from "../../_helpers/createPrismaClient"

export async function getUserByEmail(email) {
    let user
    try {
        user = await client.user.findFirst({
            where: {
                email,
            },
        })
    } catch (e) {
        console.error(e)
        user = null
    }

    return user
}

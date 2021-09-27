import client from "../_helpers/createPrismaClient"

export default async (req, res) => {
    if (!req || !req.body || !req.body.email) return res.status(400).send()

    try {
        await client.user.create({
            data: { email: req.body.email },
        })
    } catch (e) {
        console.error(
            `This is not a drill. Everybody panic. Something is wrong with the DB. User ${req.body.email} couldn't be saved: ${e}`
        )
        return res.status(500).send()
    }

    res.status(200).json()
}

import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
    if (!req || !req.body || !req.body.email) return res.status(400)

    const prisma = new PrismaClient()

    try {
        await prisma.user.create({
            data: { email: req.body.email },
        })
    } catch (e) {
        console.error(
            `This is not a drill. Everybody panic. Something is wrong with the DB. User ${req.body.email} couldn't be saved: ${e}`
        )
    }

    res.status(200).json()
}

import { getSession } from "@auth0/nextjs-auth0"
import { getUserByEmail } from "../_services/db/user"

export const withUser = async (req, res, next) => {
    const { user: sessionUser } = getSession(req, res)

    if (!sessionUser || !sessionUser.email) {
        return next()
    }

    const user = await getUserByEmail(sessionUser.email)

    res.locals = { ...res.locals, user }

    next()
}

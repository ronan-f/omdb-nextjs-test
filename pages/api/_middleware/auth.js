import { formatResponse } from "../_helpers/formatResponse"
import { server } from "../../../config"

const authenticateRequest = async (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json(formatResponse(false, 401))
    }

    let user = await fetch(`${server}/api/auth/me`, {
        method: "GET",
        headers: { Cookie: formatCookies(req.cookies) },
    })

    user = await user.json()

    if (!user || user.error) {
        return res.json(formatResponse(false, 401))
    }

    next()
}

const formatCookies = (cookiesData) => {
    return Object.entries(cookiesData)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ")
}

export default authenticateRequest

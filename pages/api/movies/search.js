import { formatResponse } from "../_helpers/formatResponse"
import { config, server } from "../../../config"

export default async function moviesHandler(req, res) {
    const { method, body } = req

    let parsedBody

    try {
        parsedBody = JSON.parse(body)
    } catch (e) {
        return res
            .status(400)
            .json(formatResponse(false, 400, `Could not parse request`))
    }

    if (!req.cookies) {
        return res
            .status(401)
            .json(formatResponse(false, 401, `Not authorized`))
    }

    const couldAuth = await authenticateRequest(req)

    if (!couldAuth) {
        return res
            .status(401)
            .json(formatResponse(false, 401, `Not authorized`))
    }

    if (method !== "POST")
        return res
            .status(405)
            .json(formatResponse(false, 405, `Method ${method} not allowed`))

    if (!parsedBody.movie) {
        return res
            .status(400)
            .json(
                formatResponse(
                    false,
                    400,
                    "Request must include movie term to search"
                )
            )
    }

    let result = await fetch(
        `http://www.omdbapi.com/?s=${paramified(
            parsedBody.movie
        )}&page=1&type=movie&r=json&apikey=${config.OMDB_API_KEY}`
    )

    if (!result || !result.json) {
        return res
            .status(404)
            .json(
                formatResponse(
                    false,
                    404,
                    `Nothing found for query ${parsedBody.movie}`
                )
            )
    }

    result = await result.json()

    return res.status(200).json(formatResponse(true, 200, result.Search))
}

const formatCookies = (cookiesData) => {
    return Object.entries(cookiesData)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ")
}

const paramified = (title) => {
    return title.split(" ").join("+")
}

const authenticateRequest = async (req) => {
    let user = await fetch(`${server}/api/auth/me`, {
        method: "GET",
        headers: { Cookie: formatCookies(req.cookies) },
    })

    user = await user.json()

    return user && !user.error
}

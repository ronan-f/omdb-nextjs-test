import { formatResponse } from "../../_helpers/formatResponse"

export const parseBody = (req, res, next) => {
    const { body } = req

    let parsedBody

    try {
        parsedBody = JSON.parse(body)
    } catch (e) {
        return res
            .status(400)
            .json(formatResponse(false, 400, `Could not parse request`))
    }

    res.locals = { parsedBody }

    next()
}

export const validateParams = (_, res, next) => {
    if (!res.locals.parsedBody) {
        return res
            .status(400)
            .json(formatResponse(false, 400, "Could not process request"))
    }
    if (
        !res.locals.parsedBody.movie ||
        typeof res.locals.parsedBody.movie !== "string"
    ) {
        return res
            .status(400)
            .json(formatResponse(false, 400, `Invalid or missing params`))
    }

    return next()
}

import { ADD } from "./contexts/ToastContext"

export const pages = {
    HOME: "/home",
    LOGOUT: "/logout",
}

export const auth = {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
}

const createErrorPayload = (content) => {
    return {
        type: ADD,
        payload: {
            severity: "error",
            content,
        },
    }
}

export const errors = {
    NO_RATING: createErrorPayload("Rating is required to submit a review"),
    GENERIC: createErrorPayload("Hmm. Something went wrong. Try again."),
}

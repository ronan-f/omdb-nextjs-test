const defaultHttpResponses = {
    401: "Not auth",
    400: "Not found",
    200: "Success",
    500: "Internal server error",
}

export const formatResponse = (success, status, data) => {
    if (!data) {
        data = defaultHttpResponses[status] || "Something went wrong"
    }

    return {
        success,
        status,
        data,
    }
}

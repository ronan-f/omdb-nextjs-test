const getApiKey = (key) => {
    if (!process.env[key]) {
        throw Error(`No env var with key: ${key}`)
    }

    return process.env[key]
}

export const config = {
    OMDB_API_KEY: getApiKey("OMDB_API_KEY"),
}

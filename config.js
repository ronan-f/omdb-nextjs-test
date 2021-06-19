const getApiKey = (key) => {
    if (process.env.NODE_ENV === "test") {
        return "test env var"
    }

    const isServer = typeof window === "undefined"

    if (!isServer) return

    if (!process.env[key]) {
        throw Error(`No env var with key: ${key}`)
    }
    return process.env[key]
}

export const config = {
    OMDB_API_KEY: getApiKey("OMDB_API_KEY"),
}

const dev = process.env.NODE_ENV !== "production"

export const server = dev
    ? "http://localhost:3000"
    : "https://omdb-nextjs-test.vercel.app"

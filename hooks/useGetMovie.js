const { server } = require("../config")

export const useGetMovie = async (id) => {
    let res = await fetch(`${server}/api/movies/${id}`, {
        method: "GET",
    })

    return res && res.json()
}

const { server } = require("../config")

export const useGetReviews = async () => {
    let res = await fetch(`${server}/api/reviews`)

    return res && res.json()
}

export default useGetReviews

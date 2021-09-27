const { server } = require("../config")
const { useQuery } = require("react-query")

export const useGetReviews = () => {
    return useQuery("reviews", () =>
        fetch(`${server}/api/reviews`).then((res) => res.json())
    )
}

export default useGetReviews

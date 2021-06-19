import { enableFetchMocks } from "jest-fetch-mock"
enableFetchMocks()
import { createResponse } from "node-mocks-http"
import { moviesHandler } from "../../../pages/api/movies/search"

beforeEach(() => {
    fetchMock.resetMocks()
})

const mockMovies = ["movie1", "movie2"]

describe("/api/movies/search", () => {
    it("Returns movies given valid search term", async () => {
        const res = createResponse({
            locals: { parsedBody: { movie: "home alone" } },
        })

        fetchMock.mockResponseOnce(JSON.stringify({ Search: mockMovies }))

        const result = await moviesHandler(null, res)

        const { success, status, data } = JSON.parse(result._getData())

        expect(success).toBe(true)
        expect(status).toBe(200)
        expect(data).toEqual(mockMovies)
    })

    it("Returns bad request if API response is missing", async () => {
        const res = createResponse({
            locals: { parsedBody: { movie: "movie that doesn't exist" } },
        })

        fetchMock.mockRejectOnce(() => {})

        const result = await moviesHandler(null, res)

        const { success, status, data } = JSON.parse(result._getData())

        expect(success).toBe(false)
        expect(status).toBe(404)
        expect(data).toBe("Nothing found for query movie that doesn't exist")
    })
})

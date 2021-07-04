import { enableFetchMocks } from "jest-fetch-mock"
enableFetchMocks()
import { createRequest, createResponse } from "node-mocks-http"
import { movieHandler } from "../../../pages/api/movies/[id]"

beforeEach(() => {
    fetchMock.resetMocks()
})

describe("/api/movies/[id]", () => {
    it("Returns a movie given a valid id", async () => {
        const req = createRequest({
            query: { id: 123 },
        })

        const res = createResponse();

        fetchMock.mockResponseOnce(JSON.stringify({ title: "Home Alone" }))

        const result = await movieHandler(req, res)

        const { success, status, data } = JSON.parse(result._getData())

        expect(success).toBe(true)
        expect(status).toBe(200)
        expect(data.title).toEqual("Home Alone")
    })

    it("Returns bad request if no movie ID is provided", async () => {
        const res = createResponse();
        const req = createRequest();

        const result = await movieHandler(req, res)

        const { success, status, data } = JSON.parse(result._getData())

        expect(success).toBe(false)
        expect(status).toBe(400)
        expect(data).toBe("No movie ID provided")
    })

    it("Returns a movie given a valid id", async () => {
        const req = createRequest({
            query: { id: 123 },
        })

        const res = createResponse();

        fetchMock.mockRejectOnce(() => { })

        const result = await movieHandler(req, res)

        const { success, status, data } = JSON.parse(result._getData())

        expect(success).toBe(false)
        expect(status).toBe(404)
        expect(data).toEqual("Nothing found for ID 123")
    })
})

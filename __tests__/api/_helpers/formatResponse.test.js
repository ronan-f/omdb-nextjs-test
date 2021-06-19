import { formatResponse } from "../../../pages/api/_helpers/formatResponse"

describe("formatResponse", () => {
    it("should return an object with success, status and data properties", () => {
        const res = formatResponse(false, 400)

        expect(res.success).toBeDefined()
        expect(res.status).toBeDefined()
        expect(res.data).toBeDefined()
    })

    it("should correctly format valid properties", () => {
        const [success, status, data] = [true, 200, "We did it"]
        const res = formatResponse(success, status, data)

        expect(res.success).toEqual(success)
        expect(res.status).toEqual(status)
        expect(res.data).toEqual(data)
    })

    it("should handle unknown status codes", () => {
        const res = formatResponse(false, 4058405)

        expect(res.data).toEqual("Something went wrong")
    })

    it("should have default data values for common status codes", () => {
        const testCases = [
            { data: [true, 200], expected: "Success" },
            { data: [false, 400], expected: "Not found" },
            { data: [false, 401], expected: "Not auth" },
            { data: [false, 500], expected: "Internal server error" },
        ]

        for (const test of testCases) {
            const res = formatResponse(...test.data)

            expect(res.data).toEqual(test.expected)
        }
    })
})

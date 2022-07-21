
const request = require("supertest")
const FormData = require("form-data")
const { app } = require("../src/app")

jest.mock("../src/services/file.service")

beforeAll(async () => {
    console.log("Executing before all test");
})

afterAll(async () => {
    console.log("Executing after all test");
})

describe("File get query tests", () => {

    it("GET file query test", async () => {
        const response = await request(app).get("/api/v1/files/54bb8acd-dd21-473d-b020-41709ac89e6a")

        console.log(response.body);
        expect(response.body.status).toEqual(true)
        expect(response.body.data.publicKey).toEqual("54bb8acd-dd21-473d-b020-41709ac89e6a")
        expect(response.body.data.download_url).toEqual("1658387326134.png")
    }, 30000)


    // it("POST file query test", async () => {
    //     const response = await request(app).get("/api/v1/files")

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.status).toEqual(true)
    //     expect(response.body.data.publicKey).toEqual("d90ffcd3-8bbc-4b4a-83ab-832859746e51")
    //     expect(extractFileNameFromUrl(response.body.data.download_url)).toEqual("1658384926078.png")
    // }, 30000)


    // it("DELETE file query test", async () => {
    //     const response = await request(app).get("/api/v1/files/d90ffcd3-8bbc-4b4a-83ab-832859746e51")

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.status).toEqual(true)
    //     expect(response.body.data.publicKey).toEqual("d90ffcd3-8bbc-4b4a-83ab-832859746e51")
    //     expect(extractFileNameFromUrl(response.body.data.download_url)).toEqual("1658384926078.png")
    // }, 30000)

})


// describe("File upload query tests", () => {

//     const filePath = `${__dirname}/public/test.png`
//     const formData = new FormData()
//     formData.append("file", filePath)

//     // it("POST a file query test", async () => {
//     //     const response = await request(app).post("/api/v1/files", formData)

//     //     expect(response.statusCode).toEqual(201)
//     //     expect(response.body.status).toEqual(true)
//     //     expect(response.body.message).toEqual("Successfully file uploaded")
//     //     expect(response.body.data.publicKey).toBe("string")
//     //     expect(response.body.data.privateKey).toBe("string")
//     // }, 30000)


//     // it("POST a file required field query test", async () => {
//     //     const response = await request(app).post("/api/v1/files")

//     //     expect(response.statusCode).toEqual(422)
//     //     expect(response.body.status).toEqual(false)
//     //     expect(response.body.errors.file).toEqual("File is required.")
//     // }, 30000)

//     it("File upload limitation exceed test", async () => {
//         const response = await request(app).post("/api/v1/files", formData)

//         expect(response.statusCode).toBe(403)
//         expect(response.body.status).toEqual(false)
//         expect(response.body.errors.message).toEqual(`You have exceeded the max store limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`)
//     }, 30000)


// })
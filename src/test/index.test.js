
// const request = require("supertest")
// const { app } = require("../../app")
// const { extractFileNameFromUrl, REQUEST_EXPIRED_IN_HOURS } = require("../helpers")

// describe("Get files", () => {

//     test("GET files return 200", async () => {
//         await request(app).get("/api/v1/files/95339105-0505-4318-b745-7876df0a30c4")
//             .expect(200)
//             .then((response) => {
//                 expect(response.body.status).toBe(true)
//                 expect(response.body.data.publicKey).toBe("95339105-0505-4318-b745-7876df0a30c4")
//                 expect(extractFileNameFromUrl(response.body.data.download_url)).toBe("1658294829921.png")
//             })
//     }, 30000)

//     test("GET files return null", async () => {
//         await request(app).get("/api/v1/files/95339105-0505-4318-b745-7876df0a30c5")
//             .expect(200)
//             .then((response) => {
//                 expect(response.body.status).toBe(true)
//                 expect(response.body.data).toBe(null)
//             })
//     }, 30000)

//     // test("GET files return exceeded the max download limit 403", async () => {
//     //     await request(app).get("/api/v1/files/95339105-0505-4318-b745-7876df0a30c4")
//     //         .expect(403)
//     //         .then((response) => {
//     //             expect(response.body.status).toBe(false)
//     //             expect(response.body.errors.message).toBe(`You have exceeded the max download limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`)
//     //         })
//     // }, 30000)



// })

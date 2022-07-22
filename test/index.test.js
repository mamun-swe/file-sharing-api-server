
const request = require("supertest")
const { app } = require("../src/app")
const {
    extractFileNameFromUrl,
    REQUEST_EXPIRED_IN_HOURS,
    saveFiles,
    findOneFile,
    clearModels
} = require("./helper/file.helper")
const { dbConnection } = require("../src/config/db.config")

describe('GET files integration test', () => {
    let files = []

    beforeAll(async () => {
        dbConnection()
        await clearModels()
        files = await saveFiles()
    })

    test('GET should return a file information', async () => {
        const response = await request(app).get(`/api/v1/files/${files[0].publicKey}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe(true)
        expect(response.body.data.publicKey).toEqual(files[0].publicKey)
        expect(extractFileNameFromUrl(response.body.data.download_url)).toEqual(files[0].filename)
    })

    test('GET should return null', async () => {
        const response = await request(app).get(`/api/v1/files/364647e9-a37e-45b5-b28c`)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe(true)
        expect(response.body.data).toBe.null
    })

    test('GET should return limit exceeded', async () => {
        let response
        for (let i = 0; i < 6; i++) {
            response = await request(app).get(`/api/v1/files/${files[1].publicKey}`)
        }

        expect(response.statusCode).toBe(403)
        expect(response.body.status).toBe(false)
        expect(response.body.errors.message).toEqual(`You have exceeded the max download limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`)
    })
})

describe('POST file integration test', () => {
    beforeAll(async () => {
        dbConnection()
        await clearModels()
    })

    test('POST should return successfully file created', async () => {
        const filePath = __dirname + "/files/rest.png"
        const response = await request(app)
            .post("/api/v1/files")
            .attach('file', filePath)

        const findOneResponse = await findOneFile(
            response.body.data.publicKey,
            response.body.data.privateKey
        )

        expect(response.statusCode).toEqual(201)
        expect(response.body.data.publicKey).toEqual(findOneResponse.publicKey)
        expect(response.body.data.privateKey).toEqual(findOneResponse.privateKey)
    })

    test('POST should not insert file test', async () => {
        const response = await request(app)
            .post("/api/v1/files")
            .attach('file')

        expect(response.statusCode).toEqual(422)
        expect(response.body.errors.file).toEqual("File is required.")
    })

    test('POST should return limit exceeded', async () => {
        let response
        const filePath = __dirname + "/files/rest.png"

        for (let i = 0; i < 6; i++) {
            response = await request(app)
                .post("/api/v1/files")
                .attach('file', filePath)
        }

        expect(response.statusCode).toBe(403)
        expect(response.body.status).toBe(false)
        expect(response.body.errors.message).toEqual(`You have exceeded the max store limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`)
    })
})

describe('DELETE file integration test', () => {
    let files = []

    beforeAll(async () => {
        dbConnection()
        await clearModels()
        files = await saveFiles()
    })

    test('DELETE should return successfully file deleted', async () => {
        const response = await request(app).delete(`/api/v1/files/${files[0].privateKey}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe(true)
        expect(response.body.message).toEqual("Successfully file deleted.")
    })

    test('DELETE should return file not found', async () => {
        const response = await request(app).delete(`/api/v1/files/rtyertert`)

        expect(response.statusCode).toBe(404)
        expect(response.body.status).toBe(false)
        expect(response.body.errors.message).toEqual("File not found.")
    })
})
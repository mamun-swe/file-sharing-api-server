const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const nocache = require("nocache")
const bodyParser = require("body-parser")
const compression = require("compression")
const fileUpload = require("express-fileupload")
dotenv.config()
const { router } = require("./routes")
const { middlewares } = require("./middlewares")
const { cleanupCornJob } = require("./services/corn-job.service")
const { FILE_UPLOAD_DIRECTORY } = require("./helpers")

const app = express()
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(nocache())

/* Cleanup corn job */
cleanupCornJob.start()

/* Bind file upload directory */
app.use(`/${FILE_UPLOAD_DIRECTORY}`, express.static(`${FILE_UPLOAD_DIRECTORY}/`))

/* Register API routes */
app.use("/api/v1/", router)

app.get('/', async (req, res) => {
    res.send("Wow!😯 are you here🙃🙃 application running!!! 😜😜😜")
})

/* 404 page handelling */
app.use((req, res, next) => {
    let error = new Error("404 page not found.")
    error.status = 404
    next(error)
})

/* Error handelling middleware registration */
app.use(middlewares.ErrorHandeller.errorHandeller)

module.exports = { app }
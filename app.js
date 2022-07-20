const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const nocache = require("nocache")
const bodyParser = require("body-parser")
const compression = require("compression")
const fileUpload = require("express-fileupload")
const { router } = require("./src/routes")
const { dbConnection } = require("./src/config/db.config")
const { cleanupCornJob } = require("./src/services/corn-job.service")
const { FILE_UPLOAD_DIRECTORY } = require("./src/helpers")

dotenv.config()

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

/* Error handelling */
app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.status(404).json({
            status: false,
            errors: {
                message: error.message
            }
        })
    }

    if (error.status === 400) {
        return res.status(400).json({
            status: false,
            errors: {
                message: "Bad request."
            }
        })
    }

    if (error.status === 401) {
        return res.status(401).json({
            status: false,
            errors: {
                message: "You have no permission."
            }
        })
    }

    return res.status(500).json({
        status: false,
        errors: {
            message: "Internal server error."
        }
    })
})

/* Establish database connection */
dbConnection()

module.exports = { app }
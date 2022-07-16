const express = require("express")
const { cpus } = require("os")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const process = require("process")
const cluster = require("cluster")
const nocache = require("nocache")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const compression = require("compression")
const fileUpload = require("express-fileupload")
const { router } = require("./src/routes")

dotenv.config()

const PORT = process.env.APP_PORT || 5000
const DB_URI = process.env.DB_URI
const UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

/* Clustering the apllication */
const numCPUs = cpus().length

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {

    const app = express()
    app.use(compression())
    app.use(helmet())
    app.use(cors())
    app.use(morgan('dev'))
    app.use(fileUpload())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(nocache())

    /* Bind file upload directory */
    app.use(`/${UPLOAD_DIRECTORY}`, express.static(`${UPLOAD_DIRECTORY}/`))

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
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    })
        .then(() => console.log("Database connected."))
        .catch(error => {
            if (error) {
                console.log("Failed to connect database.")
            console.log(error)
            }
        })

    /* Run application via port */
    app.listen(PORT, () => {
        console.log(`App running on http://localhost:${PORT}`)
    })
}
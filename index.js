
const { app } = require("./app")
const { cpus } = require("os")
const cluster = require("cluster")

const numCPUs = cpus().length
const PORT = process.env.APP_PORT || 5000

/* Clustering the apllication */
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

    /* Run application via port */
    app.listen(PORT, () => {
        console.log(`App running on http://localhost:${PORT}`)
    })
}
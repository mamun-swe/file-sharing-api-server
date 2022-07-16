
const router = require("express").Router()
const { fileRouter } = require("./file.route")

router.use("/files", fileRouter)

module.exports = { router }
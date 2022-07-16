
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")

fileRouter.get("/:publicKey", fileController.Index)
fileRouter.post("/", fileController.Store)

module.exports = { fileRouter }

const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")
const { middlewares } = require("../middlewares")

fileRouter.post("/", middlewares.RequestLimit.uploadRequestLimit, fileController.Store)
fileRouter.get("/:publicKey", middlewares.RequestLimit.downloadRequestLimit, fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
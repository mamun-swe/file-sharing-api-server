
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")
const { middlewares } = require("../middlewares")

fileRouter.post("/", middlewares.uploadRequestLimit, fileController.Store)
fileRouter.get("/:publicKey", middlewares.uploadRequestLimit, fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
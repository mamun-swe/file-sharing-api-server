
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")

fileRouter.post("/", fileController.Store)
fileRouter.get("/:publicKey", fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
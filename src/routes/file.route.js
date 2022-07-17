
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")
const { requestLimit } = require("../middlewares/requestlimit.middleware")

fileRouter.post("/", fileController.Store)
fileRouter.get("/:publicKey", requestLimit, fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
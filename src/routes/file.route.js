
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")
const { dailyDownloadLimit } = require("../middlewares/dailylimit.middleware")

fileRouter.post("/", fileController.Store)
fileRouter.get("/:publicKey", dailyDownloadLimit, fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
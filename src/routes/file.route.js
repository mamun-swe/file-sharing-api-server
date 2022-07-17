
const fileRouter = require("express").Router()
const fileController = require("../controllers/file.controller")
const {
    downloadRequestLimit,
    uploadRequestLimit
} = require("../middlewares/requestlimit.middleware")

fileRouter.post("/", uploadRequestLimit, fileController.Store)
fileRouter.get("/:publicKey", downloadRequestLimit, fileController.Index)
fileRouter.delete("/:privateKey", fileController.Destroy)

module.exports = { fileRouter }
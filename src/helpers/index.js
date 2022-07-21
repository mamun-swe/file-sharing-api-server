
const fs = require("fs")

/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}

/* Extract filename from url */
const extractFileNameFromUrl = (fileUrlPath) => {
    const itemsArray = fileUrlPath.split("/")
    const fileName = itemsArray[itemsArray.length - 1]
    return fileName
}

/* File upload to directory */
const fileUpload = async (data) => {
    try {
        const file = data

        /* Create directory if not available */
        if (!fs.existsSync(FILE_UPLOAD_DIRECTORY)) {
            fs.mkdirSync(FILE_UPLOAD_DIRECTORY)
        }

        /* Change file name to unique name */
        const fileExtension = file.name.split('.')[1]
        const renamedFile = Date.now() + '.' + fileExtension

        /* File upload path generate */
        const uploadPath = FILE_UPLOAD_DIRECTORY + "/" + renamedFile

        /* Move file to directory */
        const moveFile = file.mv(uploadPath)

        if (moveFile) {
            return {
                uploaded: "OK",
                filename: renamedFile
            }
        }
    } catch (error) {
        if (error) {
            console.log(error)
            return false
        }
    }
}

/* File delete from directory */
const fileRemove = async (data) => {

    /* file destionation with file name */
    const destination = FILE_UPLOAD_DIRECTORY + "/" + data

    /* Delete file from destionation */
    fs.unlink(destination, function (error) {
        if (error) {
            return false
        }
        return true
    })
}

/* Database URI */
const DATABASE_URI = process.env.DB_URI

/* File upload directory */
const FILE_UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

/* File download request limit */
const DOWNLOAD_REQUEST_LIMIT = process.env.DOWNLOAD_REQUEST_LIMIT || 5

/* File upload request limit */
const UPLOAD_REQUEST_LIMIT = process.env.UPLOAD_REQUEST_LIMIT || 5

/* Request expired time in hours */
const REQUEST_EXPIRED_IN_HOURS = process.env.REQUEST_EXPIRED_IN_HOURS || 10


module.exports = {
    currentHost,
    extractFileNameFromUrl,
    fileUpload,
    fileRemove,
    DATABASE_URI,
    FILE_UPLOAD_DIRECTORY,
    DOWNLOAD_REQUEST_LIMIT,
    UPLOAD_REQUEST_LIMIT,
    REQUEST_EXPIRED_IN_HOURS
}
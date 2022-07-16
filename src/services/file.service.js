
const fs = require("fs")

/* File upload to directory */
const fileUpload = async (data) => {
    try {
        const file = data
        const UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

        /* Create directory if not available */
        if (!fs.existsSync(UPLOAD_DIRECTORY)) {
            fs.mkdirSync(UPLOAD_DIRECTORY)
        }

        /* Change file name to unique name */
        const fileExtension = file.name.split('.')[1]
        const renamedFile = Date.now() + '.' + fileExtension

        /* File upload path generate */
        const uploadPath = UPLOAD_DIRECTORY + "/" + renamedFile

        /* Move file to directory */
        const moveFile = file.mv(uploadPath)

        if (moveFile) return renamedFile
    } catch (error) {
        if (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = {
    fileUpload
}
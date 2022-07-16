
const fs = require("fs")
const { FILE_UPLOAD_DIRECTORY } = require("../helpers")

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

        if (moveFile) return renamedFile
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

module.exports = {
    fileUpload,
    fileRemove
}
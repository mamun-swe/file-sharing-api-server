
const { validator } = require("../validators")
const { currentHost } = require("../helpers")
const {
    fileUpload,
    fileRemove,
    FILE_UPLOAD_DIRECTORY
} = require("../helpers")
const {
    generatePublicKey,
    generatePrivateKey
} = require("../services/key.service")
const {
    findOneFile,
    createNewFile,
    findOneAndUpdateFile,
    findOneAndDeleteFile
} = require("../services/file.service")

/* Get specific resource */
const Index = async (req, res, next) => {
    try {
        let data = null
        const { publicKey } = req.params

        /* Find file */
        const result = await findOneFile({ publicKey }, { filename: 1, publicKey: 1, last_download_timestamp: 1 })

        /* Modify result */
        if (result) {
            data = {
                publicKey: result.publicKey,
                download_url: currentHost(req) + FILE_UPLOAD_DIRECTORY + "/" + result.filename
            }
        }

        /* Update current time to download timestmp */
        await findOneAndUpdateFile({ publicKey }, { last_download_timestamp: Date.now() })

        /* Send success response to user with data */
        res.status(200).json({
            status: true,
            data
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Store new resource */
const Store = async (req, res, next) => {
    try {
        const data = req.files ? req.files.file : null

        /* Check validation */
        const validate = await validator.fileValidator.store(data)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Upload file to specific directory */
        const isUploadedFile = await fileUpload(data)
        if (!isUploadedFile) {
            return res.status(501).json({
                status: false,
                errors: {
                    message: "Failed to upload file."
                }
            })
        }

        /* Public & private key */
        const publicKey = await generatePublicKey()
        const privateKey = await generatePrivateKey()

        /* Store file info to database */
        await createNewFile(isUploadedFile, publicKey, privateKey)

        /* Send success response */
        res.status(201).json({
            status: true,
            message: "Successfully file uploaded",
            data: {
                publicKey,
                privateKey
            }
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy specific resource */
const Destroy = async (req, res, next) => {
    try {
        const { privateKey } = req.params

        /* Fetch file info from database */
        const result = await findOneFile({ privateKey })
        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "File not found."
                }
            })
        }

        /* Remove file from directory */
        const isFileRemoved = fileRemove(result.filename)
        if (!isFileRemoved) {
            return res.status(501).json({
                status: false,
                errors: {
                    message: "Failed to delete file."
                }
            })
        }

        /* Delete file info from server */
        await findOneAndDeleteFile({ privateKey })

        /* Send success response to user */
        res.status(200).json({
            status: true,
            message: "Successfully file deleted."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = {
    Index,
    Store,
    Destroy
}
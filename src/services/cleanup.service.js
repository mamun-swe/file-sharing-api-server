
const File = require("../models/file.model")
const { fileRemove } = require("../services/file.service")

const cleanupService = async () => {
    try {
        const nonDownloadedFiles = await File.find({ last_download_timestamp: 0 })
        const arrLength = nonDownloadedFiles.length

        /* Remove files from directory */
        if (nonDownloadedFiles && arrLength > 0) {
            for (let i = 0; i < arrLength; i++) {
                fileRemove(nonDownloadedFiles[i].filename)
            }
        }

        /* Delete data from database */
        await File.deleteMany({ last_download_timestamp: 0 })

        return true
    } catch (error) {
        if (error) throw error
    }
}

module.exports = { cleanupService }
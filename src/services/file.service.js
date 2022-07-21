
const File = require("../models/file.model")

/* FindOne file from database */
const findOneFile = async (key, items) => {
    try {
        return await File.findOne({ ...key }, { ...items })
    } catch (error) {
        if (error) throw error
    }
}

/* Create new file */
const createNewFile = async (filename, publicKey, privateKey) => {
    try {
        const newFile = new File({
            filename,
            publicKey,
            privateKey
        })

        return await newFile.save()
    } catch (error) {
        if (error) throw error
    }
}

/* findOneAndUpdate file to database */
const findOneAndUpdateFile = async (key, values) => {
    try {
        return await File.findOneAndUpdate({ ...key }, { $set: { ...values } })
    } catch (error) {
        if (error) throw error
    }
}

/* Delete file */
const findOneAndDeleteFile = async (key) => {
    try {
        return await File.findOneAndDelete({ key })
    } catch (error) {
        if (error) throw error
    }
}

/* Delete all files */
const deleteAllFile = async () => {
    try {
        return await File.deleteMany({})
    } catch (error) {
        if (error) throw error
    }
}

module.exports = {
    findOneFile,
    createNewFile,
    findOneAndUpdateFile,
    findOneAndDeleteFile,
    deleteAllFile
}
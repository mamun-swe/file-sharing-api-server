
const File = require("../models/file.model")

/* FindOne file from database */
const findOneFile = async (key, items) => {
    try {
        console.log("key ", key);
        console.log("items ", items);
        const result = await File.findOne({ ...key }, { ...items })
        console.log("result sdfsadf ", result);
        return result
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

        await newFile.save()
        return newFile
    } catch (error) {
        if (error) throw error
    }
}

/* findOneAndUpdate file to database */
const findOneAndUpdateFile = async (key, values) => {
    try {
        const result = await File.findOneAndUpdate({ ...key }, { $set: { ...values } })
        return result
    } catch (error) {
        if (error) throw error
    }
}

/* Delete file */
const findOneAndDeleteFile = async (key) => {
    try {
        const result = await File.findOneAndDelete({ key })
        return result
    } catch (error) {
        if (error) throw error
    }
}

module.exports = {
    findOneFile,
    createNewFile,
    findOneAndUpdateFile,
    findOneAndDeleteFile
}

const { Schema, model } = require("mongoose")

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    publicKey: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    privateKey: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    last_download_timestamp: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const File = model("File", fileSchema)
module.exports = File
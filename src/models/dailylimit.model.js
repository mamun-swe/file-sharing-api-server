
const { Schema, model } = require("mongoose")

const dailyLimitSchema = new Schema({
    ip: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    total_download: {
        type: Number,
        default: 0
    },
    total_upload: {
        type: Number,
        default: 0
    },
    download_iat: {
        type: Number,
        default: 0
    },
    download_exp: {
        type: Number,
        default: 0
    },
    upload_iat: {
        type: Number,
        default: 0
    },
    upload_exp: {
        type: Number,
        default: 0
    }
})

const DailyLimit = model("DailyLimit", dailyLimitSchema)
module.exports = DailyLimit
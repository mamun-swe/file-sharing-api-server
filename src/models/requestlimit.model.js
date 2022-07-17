
const { Schema, model } = require("mongoose")

const requestLimitSchema = new Schema({
    ip: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    request_for: {
        type: String,
        default: "download",
        enum: ["download", "upload"]
    },
    request_exp_timestamp: {
        type: Number,
        required: true
    },
    request_count: {
        type: Number,
        required: true
    }
})

const RequestLimit = model("RequestLimit", requestLimitSchema)
module.exports = RequestLimit
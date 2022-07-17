
const RequestLimit = require("../models/requestlimit.model")
const {
    DOWNLOAD_REQUEST_LIMIT,
    UPLOAD_REQUEST_LIMIT,
    REQUEST_EXPIRED_IN_HOURS
} = require("../helpers")

/* Donwnload request limit */
const downloadRequestLimit = async (req, res, next) => {
    try {
        const ip = req.ip
        const currentRequestTime = Date.now()

        /* Calculate expired timestamp in hours from first request */
        const expiredTimestamp = currentRequestTime + (1000 * 60 * 60 * REQUEST_EXPIRED_IN_HOURS)

        /* if no record is found, create a new record for user and store to db collection */
        const record = await RequestLimit.findOne({
            $and: [
                { ip },
                { request_for: "download" }
            ]
        })

        if (!record) {
            const newRequestLimit = new RequestLimit({
                ip,
                request_for: "download",
                request_exp_timestamp: expiredTimestamp,
                request_count: 1
            })

            await newRequestLimit.save()
            return next()
        }

        /* if record is found, parse it's value and calculate number of requests users has made within the last window */
        if (currentRequestTime > record.request_exp_timestamp) {
            await RequestLimit.findOneAndUpdate({
                $and: [
                    { ip },
                    { request_for: "download" }
                ]
            },
                {
                    $set: {
                        request_exp_timestamp: expiredTimestamp,
                        request_count: 1
                    }
                }
            )
        } else {

            /* id request count is less than daily limit than increment request count to record */
            if (record.request_count + 1 <= DOWNLOAD_REQUEST_LIMIT) {
                await RequestLimit.findOneAndUpdate(
                    {
                        $and: [
                            { ip },
                            { request_for: "download" }
                        ]
                    },
                    { $inc: { request_count: 1 } }
                )
                return next()
            } else {
                return res.status(403).json({
                    status: false,
                    errors: {
                        message: `You have exceeded the max download limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`
                    }
                })
            }
        }

        next()
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Upload request limit */
const uploadRequestLimit = async (req, res, next) => {
    try {
        const ip = req.ip
        const currentRequestTime = Date.now()

        /* Calculate expired timestamp in hours from first request */
        const expiredTimestamp = currentRequestTime + (1000 * 60 * 60 * REQUEST_EXPIRED_IN_HOURS)

        /* if no record is found, create a new record for user and store to db collection */
        const record = await RequestLimit.findOne({
            $and: [
                { ip },
                { request_for: "upload" }
            ]
        })

        if (!record) {
            const newRequestLimit = new RequestLimit({
                ip,
                request_for: "upload",
                request_exp_timestamp: expiredTimestamp,
                request_count: 1
            })

            await newRequestLimit.save()
            return next()
        }

        /* if record is found, parse it's value and calculate number of requests users has made within the last window */
        if (currentRequestTime > record.request_exp_timestamp) {
            await RequestLimit.findOneAndUpdate({
                $and: [
                    { ip },
                    { request_for: "upload" }
                ]
            },
                {
                    $set: {
                        request_exp_timestamp: expiredTimestamp,
                        request_count: 1
                    }
                }
            )
        } else {

            /* id request count is less than daily limit than increment request count to record */
            if (record.request_count + 1 <= UPLOAD_REQUEST_LIMIT) {
                await RequestLimit.findOneAndUpdate(
                    {
                        $and: [
                            { ip },
                            { request_for: "upload" }
                        ]
                    },
                    { $inc: { request_count: 1 } }
                )
                return next()
            } else {
                return res.status(403).json({
                    status: false,
                    errors: {
                        message: `You have exceeded the max store limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`
                    }
                })
            }
        }

        next()
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = {
    downloadRequestLimit,
    uploadRequestLimit
}
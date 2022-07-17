
const RequestLimit = require("../models/requestlimit.model")
const { DAILY_REQUEST_LIMIT, REQUEST_EXPIRED_IN_HOURS } = require("../helpers")

const requestLimit = async (req, res, next) => {
    try {
        const ip = req.ip
        const currentRequestTime = Date.now()

        /* Calculate expired timestamp in hours from first request */
        const expiredTimestamp = currentRequestTime + (1000 * 60 * 60 * REQUEST_EXPIRED_IN_HOURS)

        /* if no record is found, create a new record for user and store to db collection */
        const record = await RequestLimit.findOne({ ip })
        if (!record) {
            const newRequestLimit = new RequestLimit({
                ip,
                request_exp_timestamp: expiredTimestamp,
                request_count: 1
            })

            await newRequestLimit.save()
            return next()
        }

        /* if record is found, parse it's value and calculate number of requests users has made within the last window */
        if (currentRequestTime > record.request_exp_timestamp) {
            await RequestLimit.findOneAndUpdate(
                { ip },
                {
                    $set: {
                        request_exp_timestamp: expiredTimestamp,
                        request_count: 1
                    }
                }
            )
        } else {

            /* id request count is less than daily limit than increment request count to record */
            if (record.request_count + 1 <= DAILY_REQUEST_LIMIT) {
                await RequestLimit.findOneAndUpdate(
                    { ip },
                    { $inc: { request_count: 1 } }
                )
                return next()
            } else {
                return res.status(403).json({
                    status: false,
                    errors: {
                        message: `You have exceeded the max requests limit for next ${REQUEST_EXPIRED_IN_HOURS} hours!`
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

module.exports = { requestLimit }
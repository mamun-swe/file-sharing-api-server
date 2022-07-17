
const DailyLimit = require("../models/requestlimit.model")
const { DAILY_FILE_DOWNLOAD_LIMIT } = require("../helpers")

/* Create daily download limit */
const createDownloadLimit = async (ip) => {
    try {

        /* Issue time */
        const iatTime = Date.now()

        /* Expire time after 24 hrs */
        const expTime = iatTime + (1000 * 60 * 60 * 24)

        /* Check existing */
        const addressIsExist = await DailyLimit.findOne({ ip })

        /* If address not exist then store request */
        if (!addressIsExist) {
            const newDailyLimit = new DailyLimit({
                ip,
                total_download: 1,
                download_iat: iatTime,
                download_exp: expTime
            })

            await newDailyLimit.save()
            return true
        }

        /* If address is exist check expire time & download limit */
        if (
            addressIsExist.download_iat < addressIsExist.download_exp &&
            addressIsExist.total_download < DAILY_FILE_DOWNLOAD_LIMIT
        ) {

            /* Increment download limit */
            await DailyLimit.findOneAndUpdate(
                { ip },
                { $inc: { total_download: 1 } }
            )
            return true
        } else {

            /* Make new iat & exp time for download */
            await DailyLimit.findOneAndUpdate(
                { ip },
                {
                    $set: {
                        download_iat: addressIsExist.download_exp,
                        // download_exp: 
                    }
                }
            )

            return false
        }

    } catch (error) {
        if (error) {
            throw error
        }
    }
}

module.exports = {
    createDownloadLimit
}
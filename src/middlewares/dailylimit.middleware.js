
const {
    createDownloadLimit
} = require("../services/dailylimit.service")

/* Daily download limit */
const dailyDownloadLimit = async (req, res, next) => {
    try {
        let flag = false
        const requestIpAddress = req.ip

        const createLimit = await createDownloadLimit(requestIpAddress)
        if (createLimit) flag = true

        if (!flag) {
            return res.status(500).json({
                status: false,
                errors: {
                    message: "You have crossed your daily download limit."
                }
            })
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
    dailyDownloadLimit
}
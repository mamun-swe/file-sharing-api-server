
const cron = require("node-cron")
const { cleanupService } = require("./cleanup.service")

/* cleanup corn job service */
const cleanupCornJob = cron.schedule(
    '59 59 23 * * *', /* everyday at 23:59:59 */
    async () => {
        await cleanupService()
        console.log(`Cleanup job executing ${new Date().toUTCString()}`)
    }
)

module.exports = { cleanupCornJob }
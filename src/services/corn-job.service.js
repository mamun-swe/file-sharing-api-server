
const cron = require("node-cron")

/* cleanup corn job service */
const cleanupCornJob = cron.schedule(
    // '59 59 23 * * *', /* everyday at 23:59:59 */
    "*/20 * * * * *", /* Every 20 seconds */
    async () => {
        console.log(`Cleanup job running ${new Date().toUTCString()}`)

        /* Execute function goes here */
    }
)

module.exports = { cleanupCornJob }
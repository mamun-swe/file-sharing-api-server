
/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}

/* File upload directory */
const FILE_UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

/* Daily file download limit */
const DAILY_FILE_DOWNLOAD_LIMIT = process.env.DAILY_DOWNLOAD_LIMIT || 5


module.exports = {
    currentHost,
    FILE_UPLOAD_DIRECTORY,
    DAILY_FILE_DOWNLOAD_LIMIT
}
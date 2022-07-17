
/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}

/* File upload directory */
const FILE_UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

/* Daily file download limit */
const DAILY_REQUEST_LIMIT = process.env.REQUEST_LIMIT || 5

/* Request expired time in hours */
const REQUEST_EXPIRED_IN_HOURS = process.env.REQUEST_EXPIRED_IN_HOURS || 24


module.exports = {
    currentHost,
    FILE_UPLOAD_DIRECTORY,
    DAILY_REQUEST_LIMIT,
    REQUEST_EXPIRED_IN_HOURS
}
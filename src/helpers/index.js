
/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}

/* File upload directory */
const FILE_UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"

/* File download request limit */
const DOWNLOAD_REQUEST_LIMIT = process.env.DOWNLOAD_REQUEST_LIMIT || 5

/* File upload request limit */
const UPLOAD_REQUEST_LIMIT = process.env.UPLOAD_REQUEST_LIMIT || 5

/* Request expired time in hours */
const REQUEST_EXPIRED_IN_HOURS = process.env.REQUEST_EXPIRED_IN_HOURS || 10


module.exports = {
    currentHost,
    FILE_UPLOAD_DIRECTORY,
    DOWNLOAD_REQUEST_LIMIT,
    UPLOAD_REQUEST_LIMIT,
    REQUEST_EXPIRED_IN_HOURS
}
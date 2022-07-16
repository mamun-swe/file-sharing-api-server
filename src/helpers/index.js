
/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}

/* File upload directory */
const FILE_UPLOAD_DIRECTORY = process.env.FOLDER || "uploads"


module.exports = {
    currentHost,
    FILE_UPLOAD_DIRECTORY
}
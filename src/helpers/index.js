
/* Get current host URL */
const currentHost = (req) => {
    return "http://" + req.get("host") + "/"
}


module.exports = {
    currentHost
}
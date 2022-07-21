
const RequestLimit = require("./requestlimit.middleware")
const ErrorHandeller = require("./error-handeller.middleware")

const middlewares = {
    RequestLimit,
    ErrorHandeller
}

module.exports = { middlewares }
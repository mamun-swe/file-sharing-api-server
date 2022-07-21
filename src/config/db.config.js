
const mongoose = require("mongoose")
const { DATABASE_URI } = require("../helpers")

/* Database connection configuration */
const dbConnection = async () => {
    try {
        console.log("Database connecting...")

        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        })

        console.log("Database connection established.")
    } catch (error) {
        if (error) {
            console.log("Failed to connect database.")
        }
    }
}

module.exports = { dbConnection }
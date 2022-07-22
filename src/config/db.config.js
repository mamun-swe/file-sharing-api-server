
const mongoose = require("mongoose")
const { DATABASE_URI } = require("../helpers")

/* Database connection configuration */
const dbConnection = async () => {
    try {
        const PROD_DB_URI = process.env.DB_URI
        const TEST_DB_URI = process.env.TEST_DB_URI

        const DB_URI = process.env.ENVIRONMENT = "TEST" ? TEST_DB_URI : PROD_DB_URI

        console.log("Database connecting...")
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        })

        console.log("Database connection established.")
        console.log("Connected database:", DB_URI)
    } catch (error) {
        if (error) {
            console.log("Failed to connect database.")
        }
    }
}

module.exports = { dbConnection }
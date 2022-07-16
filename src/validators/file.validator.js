

/* File store validator */
const store = data => {
    let errors = {}

    if (!data) errors.file = "File is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    store
}
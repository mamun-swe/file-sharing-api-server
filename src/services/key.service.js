
const { v4: uuidv4 } = require("uuid")

/* Generate public key */
const generatePublicKey = async () => {
    const key = uuidv4()
    return key
}

/* Generate private key */
const generatePrivateKey = async () => {
    const key = uuidv4() + "-" + Date.now()
    return key
}

module.exports = {
    generatePublicKey,
    generatePrivateKey
}

const FilesModel = require("../../models/file.model")

let files = [
    {
        "_id": "62d8fb7ebc086e4eb54405b2",
        "filename": "1658387326134.png",
        "publicKey": "54bb8acd-dd21-473d-b020-41709ac89e6a",
        "privateKey": "83b61e04-a618-48d6-a8a3-720d462bf7d5-1658387326136",
        "last_download_timestamp": 0,
        "createdAt": "2022-07-21T13:08:46.146+06:00",
        "updatedAt": "2022-07-21T13:08:46.146+06:00"
    }
]

const findOneFile = async (publicKey, items) => {

    console.log("Hi i'm here.");
    const result = await files.find(x => x.publicKey === publicKey)
    return {
        status: true,
        data: {
            publicKey: result.publicKey,
            filename: result.filename
        }
    }
}

// const createNewFile = async (data) => {
//     const model = new FilesModel(data)
//     files.push(model)

//     return {
//         status: true,
//         message: "Successfully file uploaded",
//         data: {
//             publicKey: "54bb8acd-dd21-473d-b020-41709ac89e6a",
//             privateKey: "83b61e04-a618-48d6-a8a3-720d462bf7d5-1658387326136"
//         }
//     }
// }

// const deleteFileByPrivateKey = async (privateKey) => {
//     files = []

//     return {
//         status: true,
//         message: "Successfully file deleted."
//     }
// }

module.exports = {
    findOneFile,
    // createNewFile
}
const FilesModel = require("../../src/models/file.model");
const RequestLimitModel = require("../../src/models/requestlimit.model");

/* Extract filename from url */
const extractFileNameFromUrl = (fileUrlPath) => {
  const itemsArray = fileUrlPath.split("/");
  const fileName = itemsArray[itemsArray.length - 1];
  return fileName;
};

/* Request expired time in hours */
const REQUEST_EXPIRED_IN_HOURS = process.env.REQUEST_EXPIRED_IN_HOURS || 10;

/* Save file */
const saveFiles = async () => {
  const data = [
    {
      filename: "1658431892727.png",
      publicKey: "364647e9-a37e-45b5-b28c-e3fb7ae35718",
      privateKey: "78dfa664-3d09-4e22-bdcb-795b859b7934-1658431936799",
    },
    {
      filename: "1658431905721.png",
      publicKey: "364647e9-a37e-45b5-b28c-e3fb7ae35719",
      privateKey: "78dfa664-3d09-4e22-bdcb-795b859b7934-1658431936798",
    },
    {
      filename: "1658431936797.png",
      publicKey: "364647e9-a37e-45b5-b28c-e3fb7ae35711",
      privateKey: "78dfa664-3d09-4e22-bdcb-795b859b7934-1658431936797",
    },
  ];

  return await FilesModel.insertMany(data);
};

/* Find one file */
const findOneFile = async (publicKey, privateKey) => {
  return await FilesModel.findOne({
    publicKey: publicKey,
    privateKey: privateKey,
  });
};

/* Clear models */
const clearModels = async () => {
  await FilesModel.deleteMany({});
  await RequestLimitModel.deleteMany({});
  return;
};

module.exports = {
  extractFileNameFromUrl,
  REQUEST_EXPIRED_IN_HOURS,
  saveFiles,
  findOneFile,
  clearModels,
};

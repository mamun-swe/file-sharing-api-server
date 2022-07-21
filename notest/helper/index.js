const FileModel = require("../../models/file.model");
const insertAFile = async (data) => {
  await FileModel.deleteMany({});
  const newFile = new FileModel(data);
  const insertData = await newFile.save();
  console.log("insertData: ", insertData);
  return insertData;
};

module.exports = {
  insertAFile,
};

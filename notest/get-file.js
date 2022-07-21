
const request = require("supertest");
const { app } = require("../../app");
const {
  extractFileNameFromUrl,
  REQUEST_EXPIRED_IN_HOURS,
} = require("../helpers");
const { deleteOne } = require("../models/file.model");
const { findOneFile } = require("../services/file.service");

const { insertAFile } = require("./helper/index");

describe("File get query test", () => {
  const data = {
    filename: "1658313122425.png",
    publicKey: "361f3f8b-f935-4e0c-beb7-f595f286ff39",
    privateKey: "68edca47-4db1-4867-9e31-5d2bcf445d48-1658313122427",
  };
  beforeAll(async () => await insertAFile(data));

  it("Get a file query test", async () => {
    const queryData = { publicKey: "361f3f8b-f935-4e0c-beb7-f595f286ff39" };
    const selectItem = {
      filename: 1,
      publicKey: 1,
      last_download_timestamp: 1,
    };

    const result = await findOneFile(queryData, selectItem);
    console.log("result data: ", result);
    expect(result.publicKey).toBe("361f3f8b-f935-4e0c-beb7-f595f286ff39");
    expect(result.filename).toBe("1658313122425.png");
    // expect(result.download_url).toBe("1658313122425.png");
  }, 30000);

  it("Should not get a file test", async () => {
    const queryData = { publicKey: "361f3f8b-f935-4e0c" };
    const selectItem = {
      filename: 1,
      publicKey: 1,
      last_download_timestamp: 1,
    };

    const result = await findOneFile(queryData, selectItem);
    console.log("result data: ", result);
    expect(result).toBe.null;

    // expect(result.download_url).toBe("1658313122425.png");
  }, 30000);
});

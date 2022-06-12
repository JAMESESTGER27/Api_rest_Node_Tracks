const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error_list_items");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error_detail_items");
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error_detail_items");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.delete({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    // fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error_detail_items");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
};

const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

// get items
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.find({});
    res.send({ data, user });
  } catch (e) {
    handleHttpError(res, "Error_get_items");
  }
};
// get item
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "error_get_item");
  }
};
// create item
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_create_items");
  }
};
// update item
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(
      id,
      body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_update_items");
  }
};
// delete item
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "error_delete_item");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

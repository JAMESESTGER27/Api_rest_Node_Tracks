const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {
  createItem,
  getItems,
  getItem,

  deleteItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");

// get all items
router.get("/", getItems);
// get item
router.get("/:id", validatorGetItem, getItem);
// delete item
router.delete("/:id", validatorGetItem, deleteItem);
// create item
router.post("/", uploadMiddleware.single("myfile"), createItem);
// aqui me quede
module.exports = router;

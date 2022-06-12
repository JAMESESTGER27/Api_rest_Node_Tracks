const express = require("express");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();
// List items
router.get("/", authMiddleware, getItems);
// get detail of item
router.get(
  "/:id",
  authMiddleware,
  validatorGetItem,
  getItem
);
// create item
router.post(
  "/",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorCreateItem,
  createItem
);
// update item
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
// delete item
router.delete(
  "/:id",
  authMiddleware,
  validatorGetItem,
  deleteItem
);

module.exports = router;

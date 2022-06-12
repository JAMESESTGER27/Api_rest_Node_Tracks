const express = require("express");
const router = express.Router();
const {
  validatorRegister,
  validatorLogin,
} = require("../validators/auth");
const {
  RegisterController,
  loginController,
} = require("../controllers/auth");

router.post(
  "/register",
  validatorRegister,
  RegisterController
);
router.post("/login", validatorLogin, loginController);

module.exports = router;

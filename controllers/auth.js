const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const {
  encrypt,
  compare,
} = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
// este controlador es el encargado de registrar un usuario
const RegisterController = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = {
      ...req,
      password,
    };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "Error_register_user");
  }
};

// aqui se encarga de logear una persona
const loginController = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({
      email: req.email,
    });
    if (!user) {
      handleHttpError(res, "User_no_exists", 404);
      return;
    }
    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "Password_invalid", 401);
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error_login_user");
  }
};

module.exports = { RegisterController, loginController };

const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "Need_token", 401);
    }
    const token = req.headers.authorization
      .split(" ")
      .pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "Not_payload_data", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };
    const user = await usersModel.findOne(query);
    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "Not_session", 401);
  }
};
module.exports = authMiddleware;

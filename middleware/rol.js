const { handleHttpError } = require("../utils/handleError");
// Array con los roles permitidos
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role;
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "User_not_permisions", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "Error_permisions", 403);
  }
};

module.exports = checkRol;

const { getUserRoleAndId } = require("../getUserRoleAndId");
const { throwError } = require("../throwError");

exports.checkRole = (rolesWhichCanAccess = ["all"]) => {
  return (req, res, next) => {
    const { role: currentUserRole } = getUserRoleAndId(req);
    const isAdmin = currentUserRole == "super" || currentUserRole == "admin";
    const isAll = rolesWhichCanAccess.includes("all");
    const containsRoles = rolesWhichCanAccess.includes(currentUserRole);

    if (isAdmin || isAll || containsRoles) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }
  };
};

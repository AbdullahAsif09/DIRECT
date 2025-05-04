const { rolesToCollectionMapper } = require("../../constants");

exports.getUserRoleAndId = (req) => {
  const decodedToken = req.decodedToken; // contains field called modal (admin, userAgency, fundingAgency and user, along with _id (as userId))
  const subProfile = req.subProfile; // in case modal is user then it req.subProfile exists (contains role, either academia and industry, along with userId)

  /* simple, add root inside admin and user and not inside agencies */
  let object = {};

  if (subProfile) {
    object = {
      role: subProfile.role,
      userId: subProfile.userId,
      model: rolesToCollectionMapper[subProfile.role],
      rootUserId: decodedToken._id ?? decodedToken?.userId,
    };
  } else {
    object = {
      role: decodedToken.role,
      userId: decodedToken._id ?? decodedToken.userId,
      model: rolesToCollectionMapper[decodedToken.role],
    };
  }

  return object;
};

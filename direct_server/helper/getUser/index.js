// import collections = require("../../constants/collections");
const { models } = require("../../constants");

const getUserName = async (userId, role) => {
  const data = await models[role].findById(userId);
  return (
    data?.account?.name ?? data?.firstName + " " + data?.lastName ?? data?.name
  );
};
module.exports = {
  getUserName,
};

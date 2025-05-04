const { ROOMS } = require("../../../constants");

const UserEmitter = async (io, eventEmitter) => {
  eventEmitter.on("updateTotalUsers", (data) => {
    io.to(`${ROOMS.executive}`).emit("updateTotalUsers", data);
  });
};
module.exports = { UserEmitter };

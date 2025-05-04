const { ROOMS } = require("../../../constants");

const IndustryEmitter = async (io, eventEmitter) => {
  eventEmitter.on("updateTotalIndustries", (data) => {
    io.to(`${ROOMS.executive}`).emit("updateTotalIndustries", data);
  });
};
module.exports = { IndustryEmitter };

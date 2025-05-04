const { ROOMS } = require("../../../constants");

const AcademiaEmitter = async (io, eventEmitter) => {
  eventEmitter.on("updateTotalAcademia", (data) => {
    console.log(data, "data");
    io.to(`${ROOMS.executive}`).emit("updateTotalAcademia", data);
  });
};
module.exports = { AcademiaEmitter };

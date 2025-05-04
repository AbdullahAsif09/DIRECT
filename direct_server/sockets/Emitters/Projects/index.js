const { ROOMS } = require("../../../constants");
const { localFunctiongetPublicChatList } = require("../../../controllers/chat");

const ProjectsEmitter = async (io, eventEmitter) => {
  eventEmitter.on("updateTotalProjects", (data) => {
    io.to(`${ROOMS.executive}`).emit("updateTotalProjects", data);
  });
  eventEmitter.on("newProjectEmitterAdmin", (data) => {
    io.to(`${ROOMS.admin}`).emit("newProjectForAdmin", data);
    io.to(`${ROOMS.executive}`).emit("newProjectForAdmin", data);
  });
  eventEmitter.on("updatedProjectsEmitterAdmin", (data) => {
    io.to(`${ROOMS.admin}`).emit("updatedProjectsAdmin", data);
  });
  eventEmitter.on("updatedProjectInitialContractEmitter", (data) => {
    return console.log("updatedProjectInitialContractEmitter", data);
    io.to(`${ROOMS.admin}`).emit("projectInitialContract", data);
  });
  eventEmitter.on("updatedProjectFinalContractEmitterAdmin", (data) => {
    io.to(`${ROOMS.admin}`).emit("projectFinalContract", data);
  });
  eventEmitter.on("newProjectEmitterUser", (data) => {
    io.to(`${ROOMS.user}`).emit("newProjectForUser", data);
  });
  eventEmitter.on("newProjectEmitterAgency", (data) => {
    io.to(`${ROOMS.fundingagency}`).emit("newProjectForFundingAgency", data);
    io.to(`${ROOMS.userAgency}`).emit("newProjectForUserAgency", data);
  });
  eventEmitter.on("updatedProjectEmitterAdmin", (data) => {
    io.to(`${ROOMS.admin}`).emit("updatedProjectForAdmin", data);
  });
  eventEmitter.on("updatedProjectEmitterUser", (data) => {
    io.to(`${ROOMS.user}`).emit("updatedProjectForUser", data);
  });
  eventEmitter.on("updatedProjectEmitterAgency", (data) => {
    io.to(`${ROOMS.fundingagency}`).emit(
      "updatedProjectForFundingAgency",
      data
    );
    io.to(`${ROOMS.userAgency}`).emit("updatedProjectForUserAgency", data);
  });

  eventEmitter.on("newPublicGroupChat", (data) => {
    console.log("inside newPublicGroupChat");
    localFunctiongetPublicChatList().then((e) => {
      if (e?.result) {
        io.to(`${ROOMS.globalChat}`).emit("newPublicGroupChat", e);
      }
    });
  });
};
module.exports = { ProjectsEmitter };

const { ROOMS } = require("../../../constants");

const ProposalsEmitter = async (io, eventEmitter) => {
  eventEmitter.on("proposalSendToAgency", (data) => {
    io.to(`${ROOMS.user}`).emit("newProposalForUser", data);
    io.to(`${ROOMS.userAgency}`).emit("newProposalForUserAgency", data);
    io.to(`${ROOMS.fundingagency}`).emit("newProposalForFundingAgency", data);
  });
  eventEmitter.on("updatedProposalSendToAgency", (data) => {
    console.log("updatedProposalSendToAgency", data);
    io.to(`${ROOMS.userAgency}`).emit("updatedProposalForUserAgency", data);
    io.to(`${ROOMS.fundingagency}`).emit(
      "updatedProposalForFundingAgency",
      data
    );
  });
};
module.exports = { ProposalsEmitter };

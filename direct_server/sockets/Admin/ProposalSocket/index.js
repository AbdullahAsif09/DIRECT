const proposal = require("../../../modals/proposal");
const ProposalSocket = async (socket) => {
  getProposals(socket);
  getNumberOfProposals(socket);
};
module.exports = ProposalSocket;
const getNumberOfProposals = async (socket) => {
  socket.on("getProjectIdProposals", async (projectId) => {
    const count = await proposal.countDocuments({ projectID: projectId });
    socket.emit("getProposalsCount", count);
  });
};
const getProposals = async (socket) => {
  socket.on("projectIdGetProposals", async (projectId) => {
    const proposalData = await proposal.find({ projectID: projectId });
    socket.emit("getProposals", proposalData);
  });
};
const getRoleUser = async (socket) => {
  socket.on("projectIdGetProposals", async (projectId) => {
    const proposalData = await proposal.find({ projectID: projectId });
    socket.emit("getProposals", proposalData);
  });
};

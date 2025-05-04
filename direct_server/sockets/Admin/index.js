const ProposalSocket = require("./ProposalSocket");
const WatchStreams = require("./WatchStreams");
const EmitRoles = require("./roles");

const AdminSockets = async (socket, io) => {
  ProposalSocket(socket);
  WatchStreams(socket);
  EmitRoles(socket, io);
};
module.exports = { AdminSockets };

const WatchStreams = require("./WatchStreams");
const ProjectSockets = async (socket, io) => {
  WatchStreams(socket, io);
};
module.exports = { ProjectSockets };

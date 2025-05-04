const WatchStreams = require("./WatchStream");

const ReviewerSockets = async (socket, io) => {
  WatchStreams(socket, io);
};
module.exports = { ReviewerSockets };

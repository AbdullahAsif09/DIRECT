const projects = require("../../../modals/projects");
let userID;
const WatchStreams = async (socket, io) => {
  userID = socket.handshake.query.userID;
  await watchProject(socket, io, userID);
};
module.exports = WatchStreams;

const changeStream = projects.watch([], { fullDocument: "updateLookup" });

const watchProject = async (socket, io, userID) => {
  changeStream.on("change", (change) => {
    if (
      change.operationType === "insert" ||
      change.operationType === "update"
    ) {
      const {
        _id,
        title,
        fundingAgency,
        userAgency,
        createdAt,
        published,
      } = change?.fullDocument;
      socket.emit("watchProjectChange", {
        _id,
        title,
        createdAt,
        published,
        userAgency,
        fundingAgency,
      });
    }
  });
};

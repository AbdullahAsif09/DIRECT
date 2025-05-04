const {
  ReviewerWatchProjectAssign,
} = require("../../../helper/Sockets/ReviewerStreams");
const proposalAssignment = require("../../../modals/proposalAssignment");

let changeStream = null;
let listenersCount = 0;

const initializeChangeStream = () => {
  if (!changeStream) {
    changeStream = proposalAssignment.watch([], {
      fullDocument: "updateLookup",
    });

    changeStream.on("change", handleChange);
  }
};

const handleChange = (change) => {
  if (change.operationType === "insert") {
    console.log("watching reviewer projects");
    const { financialProposal, testing, proposalText, ...rest } =
      change?.fullDocument;
    io.emit("ReviewerWatchProjectAssign", { ...rest });
  }
};

const WatchStreams = async (socket, io) => {
  const userID = socket.handshake.query.userID;

  // Initialize the change stream if not already initialized
  initializeChangeStream();

  listenersCount += 1;

  // Handle socket disconnection
  socket.on("disconnect", () => {
    listenersCount -= 1;

    if (listenersCount === 0) {
      // No more listeners, remove the change stream listener
      changeStream.removeListener("change", handleChange);
      changeStream = null;
    }
  });

  await watchReviewerProjects(socket, io, userID);
};

const watchReviewerProjects = async (socket, io, userID) => {
  socket.join(`user_${userID}`);

  socket.on("disconnect", () => {
    socket.leave(`user_${userID}`);
  });
};

module.exports = WatchStreams;

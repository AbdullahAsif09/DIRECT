const eventEmitter = require("../../../emitter");
const { getPrivateRoomId } = require("../../../helper/Sockets");

const projectComments = async (io, socket) => {
  // Listener function for handling added comments
  const onCommentAdded = (comment, projectId) => {
    const roomId = getPrivateRoomId(projectId);
    io.to(roomId).emit("projectCommentAdded", { comment });
  };

  // Attach the listener to the event emitter
  eventEmitter.on("projectCommentAdded", onCommentAdded);

  // Clean up the listener when the socket disconnects
  socket.on("disconnect", () => {
    eventEmitter.removeListener("projectCommentAdded", onCommentAdded);
  });
};

module.exports = { projectComments };

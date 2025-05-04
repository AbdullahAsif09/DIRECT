const socketIo = require("socket.io");
const sockets = require("./index.js");
const { allowedOrigins } = require("../constants");

module.exports = (serverSockets) => {
  /* settup socket */
  const io = socketIo(serverSockets, {
    cors: { origin: allowedOrigins, credentials: true },
  });

  /* start socket logic */
  sockets.SOCKETS(io);
};

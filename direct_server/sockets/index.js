const { ROOMS } = require("../constants");
const { AdminSockets } = require("./Admin");
const eventEmitter = require("../emitter");
const { ProjectSockets } = require("./Projects");
const { ReviewerSockets } = require("./Reviewer");
const { UserEmitter } = require("./Emitters/Users");
const { milestoneChatRoomsSockets } = require("./milestonechat");
const { IndustryEmitter } = require("./Emitters/Industry");
const { ProjectsEmitter } = require("./Emitters/Projects");
const { ProposalsEmitter } = require("./Emitters/Proposals");
const socketMiddlewares = require("./middlewares/authenticator");
const { AcademiaEmitter } = require("./Emitters/Academia");
const { globalChatRoomsSockets } = require("./globalchat");

const SOCKETS = (io) => {
  io.use((socket, next) =>
    socketMiddlewares.checkIfAuthenticated(socket, next)
  );
  IndustryEmitter(io, eventEmitter);
  AcademiaEmitter(io, eventEmitter);
  UserEmitter(io, eventEmitter);
  ProjectsEmitter(io, eventEmitter);
  ProposalsEmitter(io, eventEmitter);
  io.on("connection", (socket) => {
    if (
      socket.handshake.query.userID == null ||
      socket.handshake.query.userID == undefined ||
      socket.handshake.query.userID == "null"
    ) {
      return socket.disconnect();
    } else {
      socket.join(ROOMS[socket.handshake.query.role]);
    }

    // AdminSockets(socket, io);
    // ProjectSockets(socket, io);
    // ReviewerSockets(socket, io);

    // Join the room corresponding to the user's role
    const role = socket.handshake.query.role;
    socket.join(role);

    /* project milestne */
    milestoneChatRoomsSockets(io, socket);
    globalChatRoomsSockets(io, socket);

    // Emit a message to all sockets in the room
    io.to(role).emit("messageFromRole", `Welcome to the ${role} room`);
    // console.log(io.sockets.adapter.rooms);

    socket.on("disconnect", () => {
      socket.leave(ROOMS[socket.handshake.query.role]);
    });
  });
};
module.exports = { SOCKETS };

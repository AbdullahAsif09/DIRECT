const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  return sockets;
};

const getPrivateRoomId = (projectId = "", mileStoneId = "") => {
  return `private_room_${projectId}/${mileStoneId}`;
};

const getOnlineUsers = async (io, roomId) => {
  const clients = await io.in(roomId).fetchSockets();
  const onlineUsers = clients.map((client) => client.handshake.query.userID).filter((e) => e);
  return onlineUsers;
};

module.exports = {
  emitEvent,
  getPrivateRoomId,
  getOnlineUsers,
};

const Message = require("../../modals/chatroom/message");
const { ObjectId } = require("mongodb");

const {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  START_TYPING,
  STOP_TYPING,
  I_AM_ONLINE,
  I_AM_ONLINE_ERROR,
  NEW_USER_ONLINE,
  USER_OFFLINE,
} = require("../../constants");
const { getPrivateRoomId, getOnlineUsers } = require("../../helper/Sockets");
const { getUserName } = require("../../helper/getUser");

const getRoom = (socket) => {
  const projectId = socket.projectId;
  const mileStoneId = socket.mileStoneId;
  return getPrivateRoomId(projectId, mileStoneId);
};

const milestoneChatRoomsSockets = async (io, socket) => {
  /* user status for currently project */

  socket.on(I_AM_ONLINE, async (e) => {
    const { projectId, mileStoneId } = e;
    if (!projectId) {
      return socket.emit(I_AM_ONLINE_ERROR, { error: "no project id given" });
    }
    if (!mileStoneId) {
      return socket.emit(I_AM_ONLINE_ERROR, {
        error: "no mileStone id given",
      });
    }

    const roomId = getPrivateRoomId(projectId, mileStoneId);
    let user;
    try {
      user = await getUserName(socket.authId, socket.role);
    } catch (e) {
      return socket.emit(I_AM_ONLINE_ERROR, {
        error: e.message ?? "Can't fetch user",
      });
    }
    socket.join(roomId);
    socket.projectId = projectId;
    socket.mileStoneId = mileStoneId;
    socket.role = socket.role;

    const users = await getOnlineUsers(io, roomId);
    io.to(roomId).emit(NEW_USER_ONLINE, {
      message: `${user} is online now`,
      usersonline: users,
      user: user,
    });
  });

  /* new message of project chat */

  socket.on(NEW_MESSAGE, async ({ chatId, message = " ", tagged, user }) => {
    const projectId = socket.projectId;
    const mileStoneId = socket.mileStoneId;
    const roomId = getPrivateRoomId(projectId, mileStoneId);

    const messageForRealTime = {
      content: message,
      _id: new ObjectId(),
      sender: {
        id: {
          _id: socket.authId,
          name: user.name,
        },
        model: socket.role,
      },
      tagged: tagged,
      chat: chatId,
      createdAt: new Date().toISOString(),
      content: message,
    };
    const messageForDB = {
      content: message,
      sender: {
        id: socket.authId,
        model: socket.role,
      },
      chat: chatId,
      tagged,
    };
    io.to(roomId).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(roomId).emit(NEW_MESSAGE_ALERT, { chatId, userId: socket.authId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log({ error });
    }
  });

  /* typing end event for project */

  socket.on(START_TYPING, () => {
    const roomId = getRoom(socket);
    socket.to(roomId).emit(START_TYPING, { userId: socket.authId });
  });

  /* typing stop event for project */

  socket.on(STOP_TYPING, () => {
    const roomId = getRoom(socket);
    socket.to(roomId).emit(STOP_TYPING, { userId: socket.authId });
  });

  /* disconnect/leave event for project chat */
  socket.on("disconnect", async () => {
    const projectId = socket.projectId;
    const mileStoneId = socket.mileStoneId;
    if (projectId) {
      const roomId = getPrivateRoomId(projectId, mileStoneId);
      socket.to(roomId).emit(STOP_TYPING, { userId: socket.authId });
      socket.leave(roomId);
      const users = await getOnlineUsers(io, roomId);
      socket.to(roomId).emit(USER_OFFLINE, {
        message: `User${socket.authId} is offline now`,
        users: users,
        user: socket.authId,
      });
    }
  });
};
module.exports = { milestoneChatRoomsSockets };

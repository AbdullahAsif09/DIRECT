const {
  Global_IAM_ONLINE,
  Global_IAM_ONLINE_ERROR,
  ROOMS,
  Global_Enter_Project,
  Global_Enter_Project_Error,
  Global_Leave_Project,
  Global_Leave_Project_Result,
  Global_NEW_MESSAGE,
  GLOBAL_START_TYPING,
  GLOBAL_STOP_TYPING,
  GLOBAL_PROJECT_ONLINE_USERS,
  Global_Join_Project,
  Global_Join_Project_Error,
  Globa_Project_Project_Update,
  Global_Project_Member_Request_Handler,
  Global_Project_Member_Status_Handler,
  GLOBAL_CHAT_Action,
} = require("../../constants");
const { ObjectId } = require("mongodb");

const { getUserName } = require("../../helper/getUser");
const Message = require("../../modals/chatroom/message");
const { getOnlineUsers } = require("../../helper/Sockets");
const {
  LocalFunctionPublicGroupJoinChat,
  locaFunctionGetPublicChatMessages,
  LocalFunctionHandleUserRequestByAdmin,
  LocalFunctionHandleUserStatusByAdmin,
} = require("../../controllers/chat");

const globalChatRoomsSockets = async (io, socket) => {
  const authId = socket?.sub?.userId ?? socket?.authId;
  const userRole = socket?.sub?.role ?? socket?.role;

  /* user- is inside the chat module */
  socket.on(Global_IAM_ONLINE, async () => {
    const user = await getUserName(authId, userRole);
    if (user) {
      socket.join(ROOMS.globalChat);
      socket.emit(Global_IAM_ONLINE, {
        user,
      });
    } else {
      socket.emit(Global_IAM_ONLINE_ERROR, {
        message: user ?? "User not found",
      });
    }
  });

  /* project- join chat as member */
  socket.on(Global_Join_Project, async ({ chatId }) => {
    try {
      const isValidId = ObjectId.isValid(chatId);
      if (!isValidId)
        return socket.emit(Global_Enter_Project_Error, {
          message: "Invalid id",
        });

      const joinchat = await LocalFunctionPublicGroupJoinChat(
        { authId: authId, role: userRole },
        { chatId }
      );

      if (joinchat.error) {
        return socket.emit(Global_Join_Project_Error, {
          error: joinchat.error,
        });
      }

      const messagesResult = await locaFunctionGetPublicChatMessages(
        chatId,
        {
          page: 1,
        },
        authId
      );

      if (messagesResult.error) {
        return socket.emit(Global_Enter_Project_Error, {
          error: messagesResult.error,
        });
      }

      const users = await getOnlineUsers(io, socket.projectRoom);
      io.to(socket.projectRoom).emit(GLOBAL_PROJECT_ONLINE_USERS, {
        users,
      });
      io.to(socket.projectRoom).emit(Globa_Project_Project_Update, {
        chat: joinchat,
      });

      socket.emit(Global_Join_Project, {
        data: messagesResult.data,
      });
    } catch (error) {
      console.log(error.message);
      socket.emit(Global_Join_Project_Error, {
        error: error.message,
      });
    }
  });

  /* project- enter chat */
  socket.on(Global_Enter_Project, async ({ chatInfoID, projectID }) => {
    try {
      if (!chatInfoID || !projectID)
        return socket.emit(Global_Enter_Project_Error, "Invalid request");
      const roomId = `room_${chatInfoID}_${projectID}`;
      // Check if the socket is already in the room
      const rooms = socket.rooms;

      if (!rooms.has(roomId)) {
        // Join the room if not already joined
        socket.projectRoom = roomId;
        socket.chatId = chatInfoID;
        socket.join(roomId);

        socket.emit(Global_Enter_Project, {
          message: "room is joined",
        });

        const users = await getOnlineUsers(io, socket.projectRoom);
        io.to(socket.projectRoom).emit(GLOBAL_PROJECT_ONLINE_USERS, {
          users,
        });
      } else {
        // Inform the client that the socket is already in the room
        socket.emit(Global_Enter_Project, {
          message: "already in the room",
        });

        const users = await getOnlineUsers(io, socket.projectRoom);
        io.to(socket.projectRoom).emit(GLOBAL_PROJECT_ONLINE_USERS, {
          users,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  /* project- leave chat */
  socket.on(Global_Leave_Project, async () => {
    socket.leave(socket.projectRoom);
    socket.to(socket.projectRoom).emit(Global_Leave_Project_Result, {
      result: "user left the room",
    });

    const users = await getOnlineUsers(io, socket.projectRoom);
    io.to(socket.projectRoom).emit(GLOBAL_PROJECT_ONLINE_USERS, {
      users,
    });
  });

  /* project- send message */
  socket.on(
    Global_NEW_MESSAGE,
    async ({ chatId, message = " ", tagged, user }) => {
      const roomId = socket.projectRoom;
      const messageForRealTime = {
        content: message,
        type: "html",
        _id: new ObjectId(),
        sender: {
          id: {
            _id: user?._id ?? authId,
            name: user.name,
          },
          model: user?.type === "user" ? "users" : user?.type ?? userRole,
        },
        tagged,
        chat: chatId,
        createdAt: new Date().toISOString(),
        content: message,
      };
      const messageForDB = {
        content: message,
        type: "html",
        sender: {
          id: user._id ?? authId,
          model: user?.type === "user" ? "users" : user?.type ?? userRole,
        },
        chat: chatId,
        tagged,
      };
      io.to(roomId).emit(Global_NEW_MESSAGE, {
        chatId,
        message: messageForRealTime,
      });
      try {
        await Message.create(messageForDB);
      } catch (error) {
        console.log(error.message);
      }
    }
  );

  /* project- start typing */
  socket.on(GLOBAL_START_TYPING, ({ name, role }) => {
    socket.to(ROOMS.globalChat).emit(GLOBAL_START_TYPING, {
      userId: authId,
      chatId: socket.chatId,
      name,
      role,
    });
  });

  /* project- stop typing */
  socket.on(GLOBAL_STOP_TYPING, () => {
    socket.to(ROOMS.globalChat).emit(GLOBAL_STOP_TYPING, {
      userId: authId,
      chatId: socket.chatId,
    });
  });

  /*user- disconnect */
  socket.on("disconnect", async () => {
    socket.leave(socket.projectRoom);
    socket.leave(ROOMS.globalChat);
    const users = await getOnlineUsers(io, socket.projectRoom);

    socket
      .to(ROOMS.globalChat)
      .emit(GLOBAL_STOP_TYPING, { userId: authId, chatId: socket.chatId });

    io.to(socket.projectRoom).emit(GLOBAL_PROJECT_ONLINE_USERS, {
      users,
    });
  });

  /************************** admin actions  **************************/
  socket.on(Global_Project_Member_Request_Handler, async (data) => {
    const response = await LocalFunctionHandleUserRequestByAdmin(data, authId);

    socket.emit(Global_Project_Member_Request_Handler, response);
    const decrypted = response.decrypted;
    if (decrypted) {
      const obj = {
        ...decrypted,
        requestStatus: response?.result ? "success" : "error",
      };
      io.to(ROOMS.globalChat).emit(GLOBAL_CHAT_Action, obj);
    }
  });
  socket.on(Global_Project_Member_Status_Handler, async (data) => {
    const response = await LocalFunctionHandleUserStatusByAdmin(data, authId);
    socket.emit(Global_Project_Member_Status_Handler, response);

    const decrypted = response.decrypted;
    if (decrypted) {
      const obj = {
        ...decrypted,
        requestStatus: response?.result ? "success" : "error",
      };
      io.to(ROOMS.globalChat).emit(GLOBAL_CHAT_Action, obj);
    }
  });
};
module.exports = { globalChatRoomsSockets };

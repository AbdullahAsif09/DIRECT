import { useSelector } from "react-redux";
import {
  I_AM_ONLINE,
  I_AM_ONLINE_ERROR,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  NEW_USER_ONLINE,
  START_TYPING,
  STOP_TYPING,
  USER_OFFLINE,
} from "@constants";
import { useContext, useEffect } from "react";
import { ChatContext } from ".";
import { useGetRole } from "@hooks";
import { useGetModuleName } from "@hooks/index";

export const useChat = () => {
  const role = useGetRole();
  const { socket, flag } = useSelector((state) => state.socket);
  const profile = useSelector((state) => state.profile.profile);
  const {
    chatInfo,
    setUsersonline,
    setMessages,
    setIsChatReady,
    isChatReady,
    setLiveUsers,
    setUserTyping,
    setNewMessage,
  } = useContext(ChatContext);

  /* join chatRoom */
  const joinChatRoom = () => {
    console.log("joining");

    socket?.emit(I_AM_ONLINE, {
      projectId: chatInfo?.project,
      mileStoneId: chatInfo?.milestone,
    });
  };

  /* send message  */
  const sendMessageToChat = ({ message, tagged = null }) => {
    if (!isChatReady) return;
    const objectToSend = {
      chatId: chatInfo?._id,
      message,
      tagged,
      user: {
        name:
          profile?.account?.name ??
          profile?.name ??
          profile?.firstName + profile?.lastName,
        _id: profile?._id,
        type: role,
      },
    };
    if (!tagged) {
      delete objectToSend["tagged"];
    }
    console.log("sending");
    socket?.emit(NEW_MESSAGE, objectToSend);
  };

  /* start typing event  */
  const startTypingEvent = () => {
    if (!isChatReady) return;
    socket?.emit(START_TYPING, {
      name:
        profile?.name ??
        profile?.account?.name ??
        profile?.firstName + " " + profile?.lastName,
      role,
    });
  };

  /* start typing event  */
  const stopTypingEvent = () => {
    if (!isChatReady) return;
    socket?.emit(STOP_TYPING, {});
  };

  useEffect(() => {
    if (!chatInfo || Object.keys(chatInfo).length === 0) return;
    joinChatRoom();
  }, [chatInfo, flag]);

  const m = useGetModuleName();

  useEffect(() => {
    if (!socket) return;

    socket?.on(NEW_USER_ONLINE, (e) => {
      setUsersonline(e?.users);

      if (e?.usersonline?.includes(profile?.[m]?._id ?? profile?._id)) {
        setIsChatReady(true);
      }
      setLiveUsers(e?.usersonline);
      console.log("connection true");
    });
    socket?.on(I_AM_ONLINE_ERROR, (e) => {
      console.log("connection error", e);
      setIsChatReady(false);
    });
    socket?.on(START_TYPING, (e) => {
      setUserTyping((users) => [...users, e]);
    });
    socket?.on(STOP_TYPING, (e) => {
      setUserTyping((users) =>
        users?.filter((user) => user?.userId != e?.userId)
      );
    });
    socket?.on(NEW_MESSAGE, (e) => {
      setNewMessage(e?.message?._id);
      console.log({ NEW_MESSAGE, e });

      setMessages((prev) => {
        const messages = prev?.messages ?? [];
        return { ...prev, messages: [...messages, e?.message] };
      });
    });
    socket?.on(USER_OFFLINE, (e) => {
      setLiveUsers(e?.users);
      setUserTyping((users) => users?.filter((user) => user != e?.user));
    });
    return () => {
      socket?.off(NEW_USER_ONLINE);
      socket?.off(I_AM_ONLINE_ERROR);
      socket?.off(NEW_MESSAGE_ALERT);
      socket?.off(STOP_TYPING);
      socket?.off(START_TYPING);
      socket?.off(NEW_MESSAGE);
      socket?.off(USER_OFFLINE);
    };
  }, [socket]);

  return { joinChatRoom, sendMessageToChat, stopTypingEvent, startTypingEvent };
};

import { createContext, useEffect, useState } from "react";
import { useAxios, useCrypto, useGetModuleName } from "@hooks/index";
import { useSelector } from "react-redux";
import { Global_IAM_ONLINE, Global_IAM_ONLINE_ERROR } from "@constants/index";
import { useLocation } from "react-router-dom";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, isAdmin }) => {
  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState({});
  const [usersonline, setUsersonline] = useState([]);
  const [isChatReady, setIsChatReady] = useState(false);
  const [userTyping, setUserTyping] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { socket, flag } = useSelector((state) => state.socket);
  const profile = useSelector((state) => state.profile.profile);
  const role = useGetModuleName();
  const userId = profile?.[role]?._id ?? profile?._id;
  const { encryption } = useCrypto();
  const { state } = useLocation();

  const encrypted = encryption({ role, userId }, profile?._id);
  const members = chatInfo?.members?.map((e) => {
    const id = e?.id;
    return {
      _id: id?._id,
      name: id?.account?.name ?? id?.name ?? id?.firstName + " " + id?.lastName,
      model: e?.model,
      image: id?.image ?? "",
    };
  });

  const { data: chatList, setData: setChatListData } = useAxios(
    "chatroom/projects",
    "POST",
    { e: encrypted }
  );
  const result = chatList?.result;

  useEffect(() => {
    if (!result?.length) return;
    if (chatInfo?._id) {
      if (loading) setLoading(false);
    }
    result?.forEach((item) => {
      const toFind = sessionStorage.getItem("chatInfo");
      const stateId = state?.chatId;

      const find = item?.list?.find(
        (e) => e._id == toFind || e?.project == stateId
      );

      if (find) {
        setChatInfo(find);
        setLoading(false);
        return;
      }
    });
    setLoading(false);
  }, [result]);

  useEffect(() => {
    if (!socket) return;
    socket?.emit(Global_IAM_ONLINE);
    socket?.on(Global_IAM_ONLINE, (Global_IAM_ONLINE) => {
      console.log(Global_IAM_ONLINE, "Global_IAM_ONLINE");
    });
    socket?.on(Global_IAM_ONLINE_ERROR, (Global_IAM_ONLINE_ERROR) => {
      console.log({ Global_IAM_ONLINE_ERROR });
    });
    socket?.on("newPublicGroupChat", (newPublicGroupChat) => {
      console.log(newPublicGroupChat, "newPublicGroupChat");
      setChatListData(newPublicGroupChat);
    });
    return () => {
      socket?.off("newPublicGroupChat");
      sessionStorage.removeItem("chatInfo");
    };
  }, [socket, flag]);

  const contextValue = {
    chatInfo,
    setChatInfo: setChatInfo,
    messages,
    setMessages,
    setUsersonline,
    usersonline,
    setIsChatReady,
    isChatReady,
    members,
    setUserTyping,
    userTyping,
    newMessage,
    setNewMessage,
    setPage,
    page,
    // pageLoading: loading,
    pageLoading: false,
    chatList: result || [],
    setChatListData,
    loading,
    isAdmin:
      isAdmin &&
      window.location.pathname.includes("directportal/dashboard/directrooms") &&
      profile?.role?.includes("super"),
  };
  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

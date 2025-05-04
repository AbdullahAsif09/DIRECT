import { createContext, useEffect, useState } from "react";
import { useGetQueryParam, useAxios } from "@hooks";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const id = useGetQueryParam("milestones");
  const [open, setOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const [messages, setMessages] = useState({});
  const [usersonline, setUsersonline] = useState([]);
  const [anchorElOptions, setAnchorElOptions] = useState(null);
  const [isChatReady, setIsChatReady] = useState(false);
  const [liveUsers, setLiveUsers] = useState([]);
  const [userTyping, setUserTyping] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [page, setPage] = useState(1);
  let openOptions = Boolean(anchorElOptions);

  const handleClickOptions = (event) => {
    setAnchorElOptions(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorElOptions(null);
    openOptions = Boolean(null);
  };
  const toggleDrawer = (e) => setOpen(e);

  const members = chatInfo?.members?.map((e) => {
    const id = e?.id;
    return {
      _id: id?._id,
      name: id?.account?.name ?? id?.name ?? id?.firstName + " " + id?.lastName,
      model: e?.model,
    };
  });

  const isAvailable = chatInfo && Object.keys(chatInfo).length > 0;

  /* get query */
  const { data } = useAxios(`chatroom/messages/${id}?page=${page}`);
  const { data: info } = useAxios("chatroom/chatInfo/" + id);

  useEffect(() => {
    if (!data) return;
    setMessages((e) => {
      const arr = Array.isArray(e?.messages) ? e?.messages : [];
      return {
        totalPages: data?.totalPages,
        messages: [...(data?.messages ?? []), ...arr],
      };
    });
  }, [data]);

  useEffect(() => {
    setChatInfo(info);
  }, [info]);

  const contextValue = {
    openOptions,
    handleClickOptions,
    handleCloseOptions,
    anchorElOptions,
    toggleDrawer,
    open,
    setOpen,
    chatInfo,
    setChatInfo,
    messages,
    setMessages,
    setUsersonline,
    usersonline,
    setIsChatReady,
    isChatReady,
    setLiveUsers,
    liveUsers,
    members,
    setUserTyping,
    userTyping,
    newMessage,
    setNewMessage,
    setPage,
    page,
    // pageLoading: loading,
    pageLoading: false,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {isAvailable ? children : null}
    </ChatContext.Provider>
  );
};

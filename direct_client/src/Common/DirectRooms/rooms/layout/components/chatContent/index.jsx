import { Box } from "@mui/material";
import { Fragment, useContext, useEffect } from "react";
import { Editor } from "../editor";
import { TopBar } from "./TopBar";
import { MessagesList } from "./messagesList";
import { ChatContext } from "@common/DirectRooms/rooms/context/index";
import { ContentAtCenterOfView } from "@common/UI";
import { useAxios } from "@hooks/index";
import { useSelector } from "react-redux";
import {
  Global_Enter_Project,
  Global_Enter_Project_Error,
  Global_Leave_Project,
  Global_Leave_Project_Result,
  Global_NEW_MESSAGE,
  GLOBAL_START_TYPING,
  GLOBAL_STOP_TYPING,
  GLOBAL_PROJECT_ONLINE_USERS,
  Globa_Project_Project_Update,
  GLOBAL_CHAT_Action,
} from "@constants/index";
import JoinChat from "./joinChat";

export const ChatContent = ({ showBackButton = true, md }) => {
  const { socket, flag } = useSelector((state) => state.socket);

  const {
    setPage,
    chatInfo,
    setChatInfo,
    setUserTyping,
    setIsChatReady,
    setUsersonline,
  } = useContext(ChatContext);
  const { _id, project } = chatInfo;
  const { data, loading, setData, api, error } = useAxios(
    `chatroom/project/messages/${_id}`
  );

  useEffect(() => {
    socket?.on(Globa_Project_Project_Update, (Globa_Project_Project_Update) => {
      console.log(Globa_Project_Project_Update, "Globa_Project_Project_Update");

      setChatInfo(Globa_Project_Project_Update?.chat);
    });
    socket?.on(Global_Enter_Project_Error, (data) => {
      console.log(data, "Global_Enter_Project_Error");
    });
    socket?.on(Global_Leave_Project_Result, (data) => {
      console.log(data, "Global_Leave_Project_Result");
    });
    socket?.on(Global_NEW_MESSAGE, (data) => {
      console.log(data, "Global_NEW_MESSAGE");

      setData((prev) => {
        const messsages = prev?.messages ?? [];
        return {
          ...prev,
          messages: [data?.message, ...messsages],
        };
      });
    });
    socket?.on(GLOBAL_START_TYPING, (GLOBAL_START_TYPING) => {
      console.log(GLOBAL_START_TYPING, "GLOBAL_START_TYPING");
      const { userId, chatId } = GLOBAL_START_TYPING;
      setUserTyping((arr = []) => {
        if (
          arr.some((item) => item.userId === userId && item.chatId === chatId)
        ) {
          console.log(arr);
          return arr;
        }
        return [...arr, { userId, chatId, ...GLOBAL_START_TYPING }];
      });
    });
    socket?.on(GLOBAL_STOP_TYPING, (GLOBAL_STOP_TYPING) => {
      console.log(GLOBAL_STOP_TYPING, "GLOBAL_STOP_TYPING");
      const { userId, chatId } = GLOBAL_STOP_TYPING;
      setUserTyping((arr = []) => {
        if (
          arr.some((item) => item.userId === userId && item.chatId === chatId)
        ) {
          return arr.filter(
            (item) => item.userId !== userId && item.chatId !== chatId
          );
        }

        return arr;
      });
    });
    socket?.on(GLOBAL_PROJECT_ONLINE_USERS, (GLOBAL_PROJECT_ONLINE_USERS) => {
      console.log(GLOBAL_PROJECT_ONLINE_USERS, "GLOBAL_PROJECT_ONLINE_USERS");
      const { users } = GLOBAL_PROJECT_ONLINE_USERS;
      setUsersonline(users);
    });

    return () => {
      socket?.off(Global_NEW_MESSAGE);
      socket?.off(Global_Enter_Project_Error);
      socket?.off(Global_Leave_Project_Result);
      socket?.off(GLOBAL_STOP_TYPING);
      socket?.off(GLOBAL_START_TYPING);
      socket?.off(GLOBAL_PROJECT_ONLINE_USERS);
      socket?.off(Globa_Project_Project_Update);
      setPage(1);
    };
  }, [chatInfo]);

  /* enter the project room if user is member (data?.joined) and chatInfo exists or socket reconnects due to server*/
  /* this effect allows for user to enter chat and receive messages */
  /* this effect is allowing user to join both general and projects groups ,  */
  /* in the projectID field we are checking if projectExists then user will join project group chat-else generalgroup chat */

  useEffect(() => {
    if (data?.joined) {
      if (_id) {
        socket?.emit(Global_Enter_Project, {
          chatInfoID: _id,
          projectID: project ?? "General",
        });
      }
    }

    socket?.on(Global_Enter_Project, (data) => {
      console.log(data, "Global_Enter_Project");
      setIsChatReady(true);
    });
    return () => {
      socket?.off(Global_Enter_Project);
      socket?.emit(Global_Leave_Project);
    };
  }, [data, project, flag]);

  const leave = (e) => {
    console.log({ leaving: "leaving" });

    socket?.emit(Global_Leave_Project);
    sessionStorage.removeItem("chatInfo");
    setChatInfo({});
  };

  const profile = useSelector((state) => state.profile.profile);

  /* global chat action by admin */
  useEffect(() => {
    const id = _id;
    socket?.on(GLOBAL_CHAT_Action, (GLOBAL_CHAT_Action) => {
      const { type, userId, chatId } = GLOBAL_CHAT_Action;
      const types = ["accept", "reject", "remove", "ban"];

      if (types.includes(type)) {
        if (
          chatId == id &&
          (userId == profile?._id ||
            userId == profile?.industry?._id ||
            userId == profile?._academia?._id)
        )
          api({ url: `chatroom/project/messages/${_id}`, method: "GET" })
            .then((e) => {
              console.log(e);

              setData(e);
            })
            .catch((e) => {
              console.log({ error: e });
            });
      }
    });
    return () => {
      socket?.on(GLOBAL_CHAT_Action);
    };
  }, [flag, _id, project]);

  const getNewMessages = async (pageNo) => {
    api({
      method: "GET",
      url: `chatroom/project/messages/${_id}?page=${pageNo}`,
    }).then((e) => {
      const arrOld = data?.messages ?? [];
      const arr = Array.isArray(e?.messages) ? e?.messages : [];
      const obj = {
        joined: e?.joined,
        totalPages: e?.totalPages,
        messages: [...arrOld, ...arr],
      };
      setData(obj);
      console.log(obj);
    });
  };

  /*  */

  return (
    <Box position={"relative"} height={"100%"}>
      {/* if chat not selcted then show relevent message, otherwise show chat content */}
      <Fragment>
        {!chatInfo?.name ? (
          <ContentAtCenterOfView
            code={"Chat Not Selected"}
            message={"Select any chat to continue"}
          />
        ) : /* if user joined */

        data?.joined && !loading ? (
          <Fragment>
            <TopBar showBackButton={showBackButton} leave={leave} md={md} />
            <MessagesList
              md={md}
              messages={data?.messages}
              totalPages={data?.totalPages}
              getNewMessages={getNewMessages}
            />
            <Editor />
          </Fragment>
        ) : loading ? (
          <Fragment>
            <TopBar showBackButton={showBackButton} leave={leave} />
            <MessagesList loading={loading} md={md} />
            <Editor />
          </Fragment>
        ) : data?.joined === false || data?.requested ? (
          <>
            <TopBar
              showBackButton={showBackButton}
              leave={leave}
              md={md}
              joinChat
            />
            <JoinChat
              requested={data?.requested}
              chatInfo={chatInfo}
              setData={setData}
            />
          </>
        ) : error == null ? (
          ""
        ) : (
          error?.message ?? error?.error ?? "Server not responding"
        )}
      </Fragment>
    </Box>
  );
};

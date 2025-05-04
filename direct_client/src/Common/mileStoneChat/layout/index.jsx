import { useContext } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ChatContext } from "../context";
import { ChatHeader } from "../MessageBox/Header";
import { useWindowSize } from "@hooks";
import { useChat } from "../context/useChat";
import ChatBox from "../MessageBox/ChatBox";
const drawerBleeding = 72;

const Root = styled("div")(({ theme }) => ({
  height: "50%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[50]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "white" : grey[800],
  width: "100%",
  boxShadow: "1px -1px 24px 1px rgba(158, 158, 158, 1)",
}));
const StyledBoxMessages = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "white" : grey[800],
  width: "100%",
  boxShadow: "1px -1px 24px 1px rgba(158, 158, 158, 1)",
  paddingTop: 10,
  paddingInline: 25,
  paddingBottom: 0,
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    paddingBottom: 40,
  },
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[400] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  marginTop: theme.spacing(1),
}));

function ChatLayout() {
  const {
    open,
    toggleDrawer,
    messages,
    members,
    isChatReady,
    chatInfo,
    newMessage,
    setPage,
    page,
    pageLoading,
  } = useContext(ChatContext);

  const width = useWindowSize();
  const { sendMessageToChat, stopTypingEvent, startTypingEvent } = useChat();

  if (!isChatReady) return null;
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          "#chat-drawer > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            margin: "auto",
            width: width < 992 ? "100%" : "70%",
            overflow: "visible",
            backgroundColor: "transparent",
            bosShadow: "none",
          },
        }}
      />
      <SwipeableDrawer
        sx={{
          backdropFilter: `blur(${open ? "3" : ".5"}px)`,
          zIndex: (theme) => theme.zIndex.drawer + 12,
        }}
        id="chat-drawer"
        container={window.document.body}
        anchor="bottom"
        open={open}
        allowSwipeInChildren={true}
        onClose={() => toggleDrawer(false)}
        onOpen={(e) => {}}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        disableDiscovery={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <ChatHeader />
        </StyledBox>
        <StyledBoxMessages>
          <ChatBox
            page={page}
            open={open}
            members={members}
            setPage={setPage}
            messages={messages}
            chatInfo={chatInfo}
            newMessage={newMessage}
            pageLoading={pageLoading}
            sendMessageToChat={sendMessageToChat}
            stopTypingEvent={stopTypingEvent}
            startTypingEvent={startTypingEvent}
          />
        </StyledBoxMessages>
      </SwipeableDrawer>
    </Root>
  );
}

export default ChatLayout;

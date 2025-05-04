import { Box } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Messages from "../Message";
import TextInput from "../TextInput";
import { Loading, ChipMessage } from "./components";
import dayjs from "dayjs";

const ChatBox = ({
  open,
  members,
  setPage,
  chatInfo,
  messages,
  newMessage,
  stopTypingEvent,
  startTypingEvent,
  sendMessageToChat,
  pageLoading,
  page,
}) => {
  const profile = useSelector((state) => state.profile?.profile);

  const ref = useRef();
  useEffect(() => {
    if (open || newMessage) {
      ref.current.scrollTo({
        behavior: "smooth",
        top: ref.current.scrollHeight,
      });
    }
  }, [open, newMessage]);

  const handleScroll = () => {
    if (ref.current.scrollTop === 0 && page <= messages?.totalPages) {
      setPage((e) => (e = e + 1));
    }
  };

  /* messsages render */
  const renderMessagesWithDateChips = () => {
    const renderedMessages = [];
    let lastDate = null;

    messages?.messages?.forEach((e, i) => {
      const currentMessageDate = dayjs(e?.createdAt).startOf("day");
      if (
        (!lastDate || !currentMessageDate.isSame(lastDate)) &&
        !currentMessageDate.isSame(dayjs(chatInfo?.createdAt).startOf("day"))
      ) {
        renderedMessages.push(
          <ChipMessage key={`date-${i}`} date={e?.createdAt} />
        );
        lastDate = currentMessageDate;
      }

      const isMe = e?.sender?.id?._id === profile?._id;
      const sender = members?.find(
        (member) => member?._id === e?.sender?.id?._id
      );
      const isTagged = e?.tagged?.length > 0;
      const I_tagged = e?.tagged?.find((tagged) => tagged?.id === profile?._id);

      const conditionToRender = isTagged ? I_tagged || isMe : true;
      if (conditionToRender) {
        renderedMessages.push(
          <Messages
            key={i}
            mine={isMe}
            content={e?.content}
            sender={sender ?? e?.sender?.id}
            isPrivate={I_tagged}
            date={e?.createdAt}
          />
        );
      }
    });

    return renderedMessages;
  };

  return (
    <Fragment>
      <Box
        ref={ref}
        onScroll={handleScroll}
        sx={{
          maxHeight: "87%",
          overflow: "auto",
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
        }}
      >
        {/* loading for fetching messages */}
        <Loading
          pageLoading={pageLoading}
          condition={page <= messages?.totalPages}
        />

        {/* Chip Message for latest message */}
        {page >= messages?.totalPages ? (
          <ChipMessage
            showTime
            message={"Createad at"}
            date={chatInfo?.createdAt}
          />
        ) : null}

        {renderMessagesWithDateChips()}

        <ChipMessage message={"You are seeing latest messages"} />
      </Box>
      <TextInput
        open={open}
        members={members}
        sendMessageToChat={useCallback(sendMessageToChat, [])}
        stopTypingEvent={useCallback(stopTypingEvent, [])}
        startTypingEvent={useCallback(startTypingEvent, [])}
      />
    </Fragment>
  );
};

export default ChatBox;

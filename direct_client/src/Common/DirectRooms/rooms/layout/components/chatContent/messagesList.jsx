import { Box, Divider, List, ListItem } from "@mui/material";
import { dataMessages, groupMessagesByDate } from "../index";
import { Message } from "./message";
import { PaddingBoxStyled } from "@common/DirectRooms/rooms/styled";
import { Fragment, useContext, useEffect, useRef } from "react";
import { ChipMessage } from "./ChipMessage";
import { ChatContext } from "@common/DirectRooms/rooms/context";

export const MessagesList = ({
  md,
  loading,
  messages = [],
  totalPages,
  getNewMessages,
}) => {
  const groupedMessages = groupMessagesByDate(
    loading ? dataMessages : messages
  );

  const { page, setPage, chatInfo } = useContext(ChatContext);
  const ref = useRef();
  const dragged = useRef(false);

  useEffect(() => {
    return;
    if (!dragged.current && messages?.length > 0) {
      ref.current.scrollTo({
        behavior: "smooth",
        top: ref.current.scrollHeight,
      });
      dragged.current = true;
    }
  }, [messages]);
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop < 0) {
      const diff = Math.abs(scrollTop) + clientHeight + 1; // checks if scroll is at top
      const h = scrollHeight;

      // if (ref.current.scrollTop === 0 && page <= totalPages) {

      if (h === diff && page <= totalPages) {
        let n = page + 1;
        setPage(n);
        getNewMessages(n);
      }
    }
  };
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: `calc(100%  -  calc(var(--headerHeight) * 2.1))`,
        paddingTop: `calc(var(--headerHeight) * ${md ? "1.2" : "1"})`,
        pb: 0.2,
        filter: loading ? "blur(5px)" : undefined,
      }}
    >
      <List
        sx={{
          height: "100%",
          paddingBlock: 0,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",

          display: "flex",
          flexDirection: "column-reverse",
        }}
        ref={ref}
        onScroll={handleScroll}
      >
        {Object.entries(groupedMessages).map(([date, messages], dateIndex) => {
          return (
            <Fragment key={date}>
              {messages.map((message, messageIndex) => (
                <PaddingBoxStyled key={`${dateIndex}-${messageIndex}`}>
                  <ListItem
                    sx={{
                      p: 0,
                      mb: 0,
                      py: 0,
                    }}
                  >
                    <Message
                      index={messageIndex}
                      message={message}
                      isSender={true}
                    />
                  </ListItem>
                </PaddingBoxStyled>
              ))}
              <PaddingBoxStyled>
                <Divider sx={{ color: "var(--borderColor)" }}>
                  <ChipMessage key={`date-${dateIndex}`} date={date} />
                </Divider>
              </PaddingBoxStyled>
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
};

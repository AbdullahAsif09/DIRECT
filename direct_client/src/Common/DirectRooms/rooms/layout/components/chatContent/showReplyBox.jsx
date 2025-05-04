import { Box, Stack, Collapse } from "@mui/material";
import React, { useState } from "react";
import { Message } from "./message";

const ShowReplyBox = ({ replies }) => {
  const [open, setOpen] = useState(false);
  if (!replies || replies.length === 0) return null;

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Stack
        fontSize={"12px"}
        mt={0.7}
        direction={"row"}
        alignItems={"center"}
        gap={".5rem"}
        onClick={handleToggle}
        sx={{ userSelect: "none" }}
      >
        <Box
          sx={{
            textShadow: "0 0",
            cursor: "pointer",
            fontWeight: 400,
            color: "#1364A3",
          }}
          component={"span"}
        >
          {replies.length + " replies "}
        </Box>
        <Box
          sx={{
            textShadow: "0 0",
            cursor: "pointer",
            fontWeight: 300,
            color: "#616061",
          }}
          component={"span"}
        >
          Last reply at{" "}
          {new Date(
            replies[replies.length - 1]?.createdAt
          ).toLocaleTimeString()}
        </Box>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box mt={1}>
          {replies.map((reply, index) => (
            <Message message={reply} key={index} isSender={true} />
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default ShowReplyBox;

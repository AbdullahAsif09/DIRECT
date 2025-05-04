import { TruncatedComponent } from "@common/MUI";
import { Box } from "@mui/material";
import { useCallback } from "react";

const Typingusers = ({ userTyping = [] }) => {
  const getRandom = useCallback(() => {
    if (userTyping?.length === 0) return "";

    const usersTyping =
      userTyping?.[Math.floor(Math.random() * userTyping?.length)];
    return `${usersTyping?.name} ${
      usersTyping?.role ? `(${usersTyping?.role})` : ""
    } is typing ....`;
  }, [userTyping]);
  return (
    <TruncatedComponent
      lines={1}
      Component={Box}
      sx={{
        position: "absolute",
        bottom: -25,
        left: 4,
        width: "100%",
        color: "black",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {getRandom()}
    </TruncatedComponent>
  );
};

export default Typingusers;

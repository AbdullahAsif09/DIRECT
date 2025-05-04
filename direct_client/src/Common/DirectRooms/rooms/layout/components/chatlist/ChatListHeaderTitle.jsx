import { TruncatedComponent } from "@common/MUI";
import { Stack } from "@mui/material";
import React from "react";

export const ChatListHeaderTitle = ({ title = "", sx = {}, ...rest }) => {
  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      sx={{
        fontWeight: "500",
        fontSize: "16px",
        ...sx,
        height: "var(--headerHeight)",
      }}
      {...rest}
    >
      <TruncatedComponent Component={"span"} lines={1}>
        {title}
      </TruncatedComponent>
    </Stack>
  );
};

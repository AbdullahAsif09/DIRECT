import {
  Box,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { AvatarProfile } from "../Avatar";
import { TruncatedComponent } from "@common/MUI";
import ShowReplyBox from "./showReplyBox";

export const Message = ({ message, isSender }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const { sender } = message;
  const firstName = sender?.id?.firstName;
  const lastName = sender?.id?.lastName;
  const fullName = firstName ? firstName + " " + lastName : " No Name";
  const name = sender?.id?.name ?? sender?.id?.account?.name ?? fullName;

  return (
    <Stack
      color={"black"}
      direction={isSender ? "row" : "row-reverse"}
      gap={".5rem"}
      alignItems={"flex-start"}
      justifyContent={isSender ? "flex-start" : "flex-end"}
      my={1}
      width={"100%"}
    >
      <AvatarProfile name={name} sx={{ height: 40, width: 40 }} />
      <Stack
        direction={"column"}
        justifyContent={"center"}
        justifySelf={"flex-end"}
        width={"100%"}
        alignItems={isSender ? "flex-start" : "flex-end"}
        mt={0.2}
      >
        <Stack
          direction={isSender ? "row" : "row-reverse"}
          alignItems={"center"}
          gap={"1rem"}
          mt={-0.2}
        >
          <TruncatedText sx={{ fontWeight: 600 }}>
            {name ?? "(Name not found)"}
            <Box
              className="userTagged"
              component={"span"}
              sx={{
                fontSize: "11px !important",
                display: "inline-block",
                ml: 1,
                position: "relative",
                top: "-3px !important",
                paddingBlock: "1px !important",
                background: "#763c77 !important",
                color: "white !important",
              }}
            >
              {sender?.model ?? ""}
            </Box>
          </TruncatedText>
          <TruncatedText
            sx={{
              color: "grey",
              fontWeight: 400,
              fontSize: "13.5px",
            }}
          >
            {new Date(message?.createdAt).toLocaleTimeString()}
          </TruncatedText>
        </Stack>

        <Box
          component={"span"}
          sx={{
            fontSize: "15px",
            fontWeight: 400,
            maxWidth: md ? "90%" : "65%",
            mt: -0,
          }}
          dangerouslySetInnerHTML={{ __html: message?.content }}
        ></Box>
        <ShowReplyBox replies={message?.replies} />
      </Stack>
    </Stack>
  );
};

const TruncatedText = ({ children, sx = {} }) => {
  return (
    <ListItemText sx={{ flex: "unset", m: 0 }}>
      <TruncatedComponent
        Component={"span"}
        lines={1}
        sx={{
          fontSize: "15px",
          letterSpacing: "-.1px",
          ...sx,
        }}
      >
        {children}
      </TruncatedComponent>
    </ListItemText>
  );
};

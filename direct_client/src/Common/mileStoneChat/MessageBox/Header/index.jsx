import { Avatar, AvatarGroup, Box, IconButton, Stack } from "@mui/material";
import { stringToDarkColor } from "@utils/messageColors";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { Chat, MoreVert } from "@mui/icons-material";
import { ChatContext } from "../../context";
import MenuMui from "@common/MUI/MenuMui";
import { useContext } from "react";
import { keys } from "@config";
import { motion } from "framer-motion";

export const ChatHeader = () => {
  const {
    open,
    openOptions,
    anchorElOptions,
    handleCloseOptions,
    handleClickOptions,
    toggleDrawer,
    chatInfo,
    liveUsers,
    members,
    userTyping = [],
  } = useContext(ChatContext);

  const onlineusers = liveUsers?.map((e) => members?.find((member) => member?._id == e));

  const randomUser = userTyping?.[Math.ceil(Math.random() * userTyping?.length - 1)];

  const userFromMember = members?.find((e) => e?._id == randomUser?.userId);

  const typingUser = userFromMember
    ? userFromMember?.name
    : randomUser && !userFromMember
    ? " User "
    : null;

  const handleMenuItemClick = (e) => {
    if (e) console.log(`event handleMenuItemClick  ${e}`);
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ mt: 1, mb: 1 }}
      onClick={() => !open && toggleDrawer(true)}
    >
      <Stack sx={{ p: 2, color: "text.secondary" }} direction={"row"} alignItems={"center"} gap={1}>
        <Chat sx={{ display: open ? "none" : undefined }} />
        <TypographyMUI variant={"h4"}>
          {chatInfo?.name ?? "Chat Box"}
          <Box
            sx={{
              paddingInline: 2,
              width: "100%",
              color: "black",
              pb: "1px",
              fontSize: "12px",
              zIndex: 1,
              background: "whie",
              position: "absolute",
              bottom: "8px",
              left: "0px",
              paddingRight: 4,

              /* truncate */
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {typingUser ? (
              <motion.div
                initial={{ opacity: 0.4, y: 1.5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: "#038158", fontWeight: 500 }}
              >
                ({typingUser + " is typing ... "})
              </motion.div>
            ) : null}
          </Box>
        </TypographyMUI>
      </Stack>
      {open ? (
        <>
          <MenuMui
            handleMenuItemClick={handleMenuItemClick}
            sx={{ position: "absolute", top: 0, right: 0 }}
            handleClose={handleCloseOptions}
            open={openOptions}
            anchorEl={anchorElOptions}
            itemsArray={["Members"]}
          />
          <IconButton
            sx={{ mr: 2, position: "relative" }}
            onClick={(e) => {
              handleClickOptions(e);
            }}
          >
            <MoreVert />
          </IconButton>
        </>
      ) : (
        <AvatarGroup sx={{ mr: 2 }} max={2}>
          {Array.isArray(onlineusers) &&
            onlineusers?.map((e, i) => {
              return (
                <Avatar
                  sx={{
                    background: stringToDarkColor(e?.name ?? "user"),
                  }}
                  key={i}
                  src={keys.rootserver + e?.profile}
                  alt={e?.name}
                />
              );
            })}
        </AvatarGroup>
      )}
    </Stack>
  );
};

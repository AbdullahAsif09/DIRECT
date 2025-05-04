import { AppBar, IconButton, Tooltip, Typography } from "@mui/material";
import { PaddingBoxStyled } from "@common/DirectRooms/rooms/styled";
import { ChatContext } from "@common/DirectRooms/rooms/context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState, lazy } from "react";
import { TruncatedComponent } from "@common/MUI";
import { AvatarGroups } from "../index";
import { Stack } from "@mui/system";

const SwipeableDrawer = lazy(() => import("./Drawer"));

export const TopBar = ({ showBackButton, joinChat, leave, md }) => {
  const { chatInfo, isAdmin } = useContext(ChatContext);
  const [clicked, setClicked] = useState(false);
  return (
    <AppBar
      position="absolute"
      color="transparent"
      sx={{
        p: 0,
        boxShadow: "0px 0px 8px rgba(0, 0, 0, .1)",
        background: "white",
      }}
    >
      <PaddingBoxStyled
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 0,
          height: `calc(var(--headerHeight) * ${md ? "1.3" : "1"})`,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={".5rem"}
          maxWidth={"90%"}
        >
          {showBackButton ? (
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                leave("ok");
              }}
            />
          ) : null}
          <TruncatedComponent
            lines={md ? 2 : 1}
            Component={Typography}
            sx={{
              fontWeight: md ? "bold" : 600,
              fontSize: md ? "16px" : "18px",
              fontFamily: "var(--chatFont)",
              color: "black",
              maxWidth: 750,
            }}
          >
            <Tooltip
              arrow
              title={chatInfo?.name}
              placement="right-end"
              enterDelay={800}
              enterNextDelay={500}
              slotProps={{
                tooltip: {
                  sx: {
                    fontFamily: "var(--chatFont)",
                    letterSpacing: "0.05em",
                    fontWeight: 300,
                    fontSize: 12,
                  },
                },
              }}
            >
              <>{chatInfo?.name}</>
            </Tooltip>
          </TruncatedComponent>
        </Stack>
        {isAdmin ? (
          <IconButton onClick={() => setClicked(true)}>
            <SettingsIcon />
          </IconButton>
        ) : joinChat ? null : (
          <AvatarGroups />
        )}
      </PaddingBoxStyled>
      <SwipeableDrawer setClicked={setClicked} clicked={clicked} />
    </AppBar>
  );
};

import { Avatar, Box, IconButton, Toolbar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { TruncatedComponent } from "@common/MUI";
import { NavbarContainer } from "./styled";
import { Menu } from "@mui/icons-material";
import { MenuMui } from "./Menu";
import { keys } from "@config";
import React from "react";

export const TopBar = ({
  role,
  width,
  setOpen,
  profile,
  activeAs,
  reference,
  menuList = [],
  handleOpenMenu,
  handleCloseMenu,
}) => {
  return (
    <Toolbar style={{ paddingInline: 8 }}>
      <TruncatedComponent
        sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
        lines={1}
        Component={Box}
      >
        {width < 900 ? (
          <Menu
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setOpen((e) => !e);
            }}
          />
        ) : null}{" "}
        {activeAs}
      </TruncatedComponent>

      <NavbarContainer>
        <IconButton sx={{ color: "#8D8D8D" }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={handleOpenMenu} sx={{ color: "#8D8D8D" }}>
          <Avatar
            src={keys.rootserver + profile?.[String(role).toLowerCase()]?.image}
          />
        </IconButton>
        <MenuMui
          menuList={menuList}
          reference={reference}
          handleCloseMenu={handleCloseMenu}
        />
      </NavbarContainer>
    </Toolbar>
  );
};

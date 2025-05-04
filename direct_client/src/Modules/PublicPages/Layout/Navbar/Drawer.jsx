import React, { Fragment } from "react";

import {
  Collapse,
  styled,
  List,
  Drawer,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import { useNavItems } from "./Items";
import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  LogoutOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LogoWrapperFull } from "@common/Logo";
import AuthComponent from "./AuthComponent";
import { useNav } from "./useHook";
import { useLogout } from "@hooks/index";
import { useSelector } from "react-redux";

const Div = styled("div")(({ theme }) => ({
  width: 350,
  paddingBlock: "2rem",
  paddingInline: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    paddingInline: ".5rem",
  },
}));

function DrawerNav({ setState, state }) {
  const navigate = useNavigate();
  const { getProfileLink, open, setopen } = useNav();

  const handleClick = (label) => {
    setopen((e) => (!e ? label : label === open ? false : label));
  };
  const toggleDrawerClose = () => {
    return setState(false);
  };
  const { logout } = useLogout();
  const profile = useSelector((state) => state.profile.profile);
  const { items } = useNavItems();
  const list = () => (
    <Div>
      <LogoWrapperFull onClick={toggleDrawerClose} width={80} />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          marginTop: "1rem",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {items?.map((item, ind) => {
          return item?.type !== "dropdown" ? (
            <Fragment key={ind}>
              <ListItemButton
                onClick={() => {
                  navigate(item?.url);
                  toggleDrawerClose();
                }}
              >
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.label} />
              </ListItemButton>
              {ind === items?.length - 1 && profile ? (
                <>
                  <ListItemButton
                    key={ind + 1}
                    onClick={async () => {
                      await logout();
                      toggleDrawerClose();
                    }}
                  >
                    <ListItemIcon>{<LogoutOutlined />}</ListItemIcon>
                    <ListItemText primary={"logout"} />
                  </ListItemButton>

                  <ListItemButton
                    key={ind + 2}
                    onClick={() => {
                      navigate(getProfileLink());
                      toggleDrawerClose();
                    }}
                  >
                    <ListItemIcon>{<AccountCircle />}</ListItemIcon>
                    <ListItemText primary={"Profile"} />
                  </ListItemButton>
                </>
              ) : null}
            </Fragment>
          ) : (
            <Fragment key={ind}>
              <ListItemButton onClick={() => handleClick(item?.label)}>
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.label} />
                {open === item?.label ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open === item?.label} timeout="auto" unmountOnExit>
                <List component="div" sx={{ paddingLeft: "2rem" }}>
                  {item?.children?.map((subItem, ind) => {
                    return subItem?.type === "normal" ? (
                      <ListItemButton
                        key={subItem?.label + ind}
                        onClick={() => {
                          navigate(subItem?.url);
                          toggleDrawerClose();
                        }}
                      >
                        <ListItemIcon>{subItem?.icon}</ListItemIcon>
                        <ListItemText primary={subItem?.label} />
                      </ListItemButton>
                    ) : null;
                  })}
                </List>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
      {<AuthComponent donotShowAvatar={"true"} />}
    </Div>
  );

  return (
    <React.Fragment>
      <Drawer
        style={{
          minHeight: "100vh",
          width: "100vw",
        }}
        anchor={"right"}
        open={state}
        onClose={toggleDrawerClose}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerNav;

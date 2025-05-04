import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";

import { styled } from "@mui/material";

const drawerWidth = 300;
export const ListStyled = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    paddingLeft: 40,
    paddingRight: 18,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 20,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    color: "#9e9e9e",
  },
}));
export const SubListStyled = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    paddingLeft: 60,
    paddingRight: 18,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 20,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 18,
    color: "#cccccc",
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.bg.secondDarkBlue,
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - 65px)`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: "none",
  borderBottom: "1px solid",
  [theme.breakpoints.down("md")]: {
    width: `100%`,
  },
}));
export const NavbarContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
  backgroundColor: "#fff",
  marginLeft: "auto",
  height: "100%",
}));

export const Drawer = styled(MuiDrawer)(({ theme, open, variant }) => {
  return {
    ...(open &&
      variant == "permanent" && {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }),
    ...(!open &&
      variant == "permanent" && {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),

    ...(variant == "temporary" && {
      zIndex: 1400,
    }),
  };
});
export const Container = styled("div")(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  minWidth: "300px",
  paddingLeft: "5px",
  paddingRight: "10px",
  paddingBlock: "20px",
  backgroundColor: theme.palette.bg.secondDarkBlue,
  color: "#fff",
}));

export const SectionLogo = styled("div")(({ open }) => ({
  display: "flex",
  justifyContent: open ? "center" : "flex-start",
  alignItems: "center",
  width: "100%",
  flexDirection: "row",
  gap: "1rem",
  transition: "all .3s ease-in-out",
  "& img": {
    transition: "all .3s ease-in-out",
  },
}));

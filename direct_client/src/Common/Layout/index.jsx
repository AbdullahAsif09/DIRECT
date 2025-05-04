import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  Grid,
  ListItemButton,
  ListItemText,
  Stack,
  Collapse,
} from "@mui/material";
import { LogoWrapper } from "@common/Logo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  Drawer,
  AppBar,
  Container,
  ListStyled,
  SectionLogo,
  SubListStyled,
} from "./components/styled";
import { GetButton, GetTextItem, SideBarIcon, TopBar } from "./components";
import { useWindowSize } from "@hooks/index";

const Layout = ({ list, menuList, activeAs = "" }) => {
  const width = useWindowSize();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [listItem, setListOpen] = useState(false);
  const [subListItem, setSubListOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [reference, setreference] = useState(null);
  const handleOpenMenu = (e) => {
    setreference(e.target);
  };
  const handleCloseMenu = () => {
    setreference(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setListOpen(false);
    setOpen(false);
  };
  const handlenavigate = (url) => {
    navigate(url);
  };

  const handleClickListItem = () => {
    setListOpen(!listItem);
  };
  const handleClickSubListItem = () => {
    setSubListOpen(!subListItem);
  };

  useEffect(() => {
    handleDrawerClose();
    if (reference) setreference(null);
  }, [pathname]);

  // if (!list.includes(pathname)) return "Nikal";

  const academia = pathname.includes("academia");
  const industry = pathname.includes("industry");
  const role = academia ? "Academia" : industry ? "Industry" : "User";
  const profile = useSelector((state) => state.profile.profile);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          borderBottom: 1,
          borderColor: "divider",
        }}
        position="fixed"
        open={open}
      >
        <TopBar
          open={open}
          role={role}
          width={width}
          setOpen={setOpen}
          profile={profile}
          activeAs={activeAs}
          menuList={menuList}
          reference={reference}
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
        />
      </AppBar>
      <Drawer
        variant={width > 900 ? "permanent" : "temporary"}
        open={open}
        onClose={handleDrawerClose}
      >
        <SideBarIcon
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Container>
          <Stack
            justifyContent={width < 900 ? "center" : "flex-start"}
            alignItems={"flex-start"}
            spacing={12}
          >
            <SectionLogo open={open}>
              <LogoWrapper
                width={open ? "200px" : "50px"}
                height={open ? "200px" : "50px"}
              />
            </SectionLogo>
            <List
              sx={{ width: "100%", maxWidth: 360 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {list?.map((e, i) => {
                return e?.type === "Children" ? (
                  <>
                    <ListItemButton
                      key={i}
                      onClick={() => {
                        handleClickListItem();
                        // handlenavigate("projects");
                      }}
                    >
                      <ListItemIcon>{e?.icon}</ListItemIcon>
                      <ListItemText primary={e?.title} />
                      {listItem ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={listItem} timeout="auto" unmountOnExit>
                      <ListStyled component="div" disablePadding>
                        {e?.children?.map((eSub, i) =>
                          eSub?.type === "Children" ? (
                            <>
                              <ListItemButton
                                onClick={() => {
                                  handleClickSubListItem();
                                }}
                                key={i}
                                sx={{ pl: 4 }}
                              >
                                <ListItemIcon>{eSub?.icon}</ListItemIcon>
                                <GetTextItem text={eSub?.title} />
                                {subListItem ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse
                                in={subListItem}
                                timeout="auto"
                                unmountOnExit
                              >
                                <SubListStyled component="div" disablePadding>
                                  {eSub?.children?.map((eve, ikeys) => (
                                    <GetButton
                                      key={ikeys}
                                      icon={eve?.icon}
                                      title={eve?.title}
                                    />
                                  ))}
                                </SubListStyled>
                              </Collapse>
                            </>
                          ) : (
                            <GetButton
                              key={i}
                              icon={eSub?.icon}
                              title={eSub?.title}
                            />
                          )
                        )}
                      </ListStyled>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    key={i}
                    onClick={() => handlenavigate(e?.navigate)}
                  >
                    <ListItemIcon>{e?.icon}</ListItemIcon>
                    <ListItemText primary={e.title} />
                  </ListItemButton>
                );
              })}
            </List>
          </Stack>
        </Container>
      </Drawer>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width:
            width < 900 ? "100%" : `calc(100% - ${open ? "300px" : "65px"})`,
          mt: "70px",
          pr: 1,
          pl: width < 900 ? 1.5 : 0.8,
        }}
      >
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Layout;

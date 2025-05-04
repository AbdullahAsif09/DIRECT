import { Divider, Menu, MenuItem, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "@hooks";
function MenuMui({ reference, handleCloseMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAcademia = pathname.includes("/user/academia");
  const isIndustry = pathname.includes("/user/industry");
  const isUser = !isAcademia && !isIndustry;
  const { logout } = useLogout();
  return (
    <Menu
      anchorEl={reference}
      aria-haspopup="true"
      open={Boolean(reference)}
      sx={{ marginTop: 2.2 }}
      onClose={handleCloseMenu}
    >
      {isUser ? (
        <div>
          <MenuItemStyled
            sx={{ pt: 1 }}
            onClick={() => navigate("/user/academia")}
          >
            Swtich to Academia
          </MenuItemStyled>
          <MenuItemStyled onClick={() => navigate("/user/industry")}>
            Swtich to Industry
          </MenuItemStyled>
        </div>
      ) : null}
      {isAcademia ? (
        <div>
          <MenuItemStyled
            sx={{ pt: 1 }}
            onClick={() => navigate("/user/industry")}
          >
            Swtich to Industry
          </MenuItemStyled>
          <MenuItemStyled onClick={() => navigate("/user/projects")}>
            Swtich to User
          </MenuItemStyled>
        </div>
      ) : null}
      {isIndustry ? (
        <div>
          <MenuItemStyled
            sx={{ pt: 1 }}
            onClick={() => navigate("/user/academia")}
          >
            Swtich to Academia
          </MenuItemStyled>
          <MenuItemStyled onClick={() => navigate("/user/projects")}>
            Swtich to User
          </MenuItemStyled>
        </div>
      ) : null}
      <Divider />
      <MenuItemStyled
        onClick={() => {
          logout(() => {
            navigate("/");
            handleCloseMenu();
          });
        }}
      >
        Logout
      </MenuItemStyled>
    </Menu>
  );
}

export default MenuMui;

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  fontSize: "15px",
  fontFamily: "sans-serif",
  fontWeight: 2100,
  lineHeight: "20px",
  textShadow: "0px 0px 0px",
  cursor: "pointer",
}));

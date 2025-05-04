import { Divider, Menu, MenuItem, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@hooks";
import { useSelector } from "react-redux";
export function MenuMui({ reference, handleCloseMenu, menuList = [] }) {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const profile = useSelector((state) => state.profile?.profile);
  const listInfo = [
    {
      label: profile?.email ?? profile?.account?.email,
      key: "email",
    },
    {
      type: "divider",
      key: "divider",
    },
    {
      label: "Logout",
      key: "logout",
      type: "logout",
    },
  ];
  const newArr = [...menuList, ...listInfo];

  return (
    <Menu
      anchorEl={reference}
      aria-haspopup="true"
      open={Boolean(reference) && newArr?.length > 0}
      sx={{ marginTop: 2.2 }}
      onClose={handleCloseMenu}
    >
      {newArr?.map((item) =>
        item?.type === "divider" ? (
          <Divider key={item.key} />
        ) : (
          <MenuItemStyled
            sx={{
              minWidth: 120,
            }}
            key={item.label + item.key}
            onClick={async () => {
              handleCloseMenu();
              if (item?.type === "logout") await logout();
              if (item?.type == "link" && item?.url) navigate(item?.url);
            }}
          >
            {item.label}
          </MenuItemStyled>
        )
      )}
    </Menu>
  );
}

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  fontSize: "15px",
  fontFamily: "sans-serif",
  fontWeight: 2100,
  lineHeight: "20px",
  textShadow: "0px 0px 0px",
  cursor: "pointer",
}));

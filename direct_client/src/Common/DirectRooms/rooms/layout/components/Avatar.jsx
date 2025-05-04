import { Avatar, Badge, styled } from "@mui/material";
import React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const AvatarProfile = ({ name = "", src, sx = {}, badge }) => {
  const avatar = (
    <Avatar
      sx={{
        width: 28,
        height: 28,
        borderRadius: "6px",
        border: "1px solid white",
        ...sx,
      }}
      variant="rounded"
      src={src}
    >
      {name[0]}
    </Avatar>
  );
  return badge ? (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      {avatar}
    </StyledBadge>
  ) : (
    avatar
  );
};

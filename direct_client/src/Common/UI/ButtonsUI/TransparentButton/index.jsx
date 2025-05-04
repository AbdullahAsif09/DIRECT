import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const TransparentButton = styled(Button)((data) => {
  const theme = data?.theme;
  const showAvatar = data?.showAvatar;
  return {
    background: "transparent",
    textTransform: "capitalize",
    color: showAvatar ? "white" : theme.palette.bg.green,
    border: showAvatar ? null : "2px solid " + theme.palette.bg.green,
    borderRadius: showAvatar ? null : "17px",
    padding: showAvatar ? undefined : "3px 22px",
  };
});

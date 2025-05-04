import { Button, styled } from "@mui/material";

export const SolidFull0ButtonStyled = styled(Button)(({ theme }) => ({
  paddingBlock: "12px",
  fontSize: "1.1rem",
  backgroundColor: theme.palette.bg.green,
  textTransform: "capitalize",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  border: "2.5px solid transparent",
  padding: "10px 20px",
  borderRadius: "5px",

  "&:hover": {
    backgroundColor: theme.palette.bg.greenDarker,
  },
}));

export const SolidButton = styled(Button)(({ showAvatar, theme }) => {
  return {
    backgroundColor: "#075B2B",
    textTransform: "capitalize",
    borderRadius: "17px",
    transition: "ease-in-out .17s",
    padding: showAvatar ? undefined : "3px 24px",
    border: "2.5px solid transparent",
    color: "white",

    "&:hover": {
      border: "2.5px solid #075B2B",
      backgroundColor: "transparent",
      color: theme.palette.bg.green,
    },
  };
});

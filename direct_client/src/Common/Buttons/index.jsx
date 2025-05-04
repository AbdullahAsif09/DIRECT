import { Button, styled } from "@mui/material";

export const SolidButton = ({ children, ...rest }) => {
  return (
    <SolidButtonStyled {...rest} fullWidth variant="contained">
      {children}
    </SolidButtonStyled>
  );
};
export const TransparentButton = ({ children }) => {
  return (
    <TransparentButtonStyled fullWidth variant="contained">
      {children}
    </TransparentButtonStyled>
  );
};

export const SolidButtonStyled = styled(Button)(({ theme }) => ({
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
export const TransparentButtonStyled = styled(Button)(({ theme }) => ({
  paddingBlock: "12px",
  fontSize: "1.1rem",
  color: theme.palette.bg.green,
  background: "transparent",
  border: "2.5px solid" + theme.palette.bg.greenDarker,
  textTransform: "capitalize",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  padding: "10px 20px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

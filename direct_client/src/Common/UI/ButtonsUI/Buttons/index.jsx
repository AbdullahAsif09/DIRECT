import { Button, styled } from "@mui/material";

export const Status = ({ children, ...rest }) => {
  return <StatusStyled {...rest}>{children}</StatusStyled>;
};

export default Status;

export const SolidButton = ({ children, ...rest }) => {
  return (
    <SolidButtonStyled {...rest} fullWidth variant="contained">
      {children}
    </SolidButtonStyled>
  );
};
export const TransparentButton = ({ children, ...rest }) => {
  return (
    <TransparentButtonStyled fullWidth variant="contained" {...rest}>
      {children}
    </TransparentButtonStyled>
  );
};

const StatusStyled = styled("span")((data) => {
  return {
    border: "none",
    background: "#129BE8",
    color: "white",
    borderRadius: `5px`,
    fontSize: ".96rem",
    padding: "3px 12px",
    fontFamily: "Poppins",
    fontWeight: "300",
  };
});

const SolidButtonStyled = styled(Button)(({ theme }) => ({
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
const TransparentButtonStyled = styled(Button)(({ theme }) => ({
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

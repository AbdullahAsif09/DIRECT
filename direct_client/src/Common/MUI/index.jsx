import { Grid, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
export const GridMDNone = styled(Grid)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    display: "grid",
  },
}));
export const GridMD = styled(Grid)(({ theme }) => ({
  display: "grid",
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

export const TruncatedComponent = ({
  Component,
  lines = 2,
  children,
  ...rest
}) => {
  const TruncatedStyled = styled(Component)(({ theme }) => ({
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
  }));
  return <TruncatedStyled {...rest}>{children}</TruncatedStyled>;
};

export const BackArrowButtonComp = ({
  route,
  marginBottom,
  marginTop,
  text = "Back",
}) => {
  const ButtonBack = styled(Button)(({ theme }) => ({
    color: "#949494",
    marginTop: marginTop ? marginTop : "20px",
    marginBottom: marginBottom ? marginBottom : "120px",
  }));
  const navigate = useNavigate();
  return (
    <ButtonBack
      onClick={() => navigate(route)}
      startIcon={<ArrowBackRoundedIcon />}
    >
      {text}
    </ButtonBack>
  );
};

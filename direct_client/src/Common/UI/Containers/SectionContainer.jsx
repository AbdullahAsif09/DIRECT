import { styled } from "@mui/material";
const SectionContainerStyled = styled("div")(({ theme }) => {
  return {
    paddingBlock: "5rem",
    margin: "auto",
    position: "relative",
    boxSizing: "border-box",
    [theme.breakpoints.up("lg")]: {
      paddingBlock: "3.5rem",
      paddingInline: "2.5rem",
    },
    [theme.breakpoints.down("lg")]: {
      paddingBlock: "3.5rem",
      paddingInline: "2.5rem",
    },
    [theme.breakpoints.down("md")]: {
      paddingBlock: "3rem",
      paddingInline: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      // paddingBlock: "1.5rem",
      paddingInline: "1.5rem",
    },
  };
});
export const SectionContainer = ({ children, style = undefined }) => {
  return (
    <SectionContainerStyled style={style}>{children}</SectionContainerStyled>
  );
};

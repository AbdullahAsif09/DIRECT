import { Box, Grid, styled } from "@mui/material";

export const ParenGrid = styled(Grid)(({ theme, loading }) => {
  return {
    "--headerHeight": "60px",
    "--mainColor": "#522653",
    "--borderColor": "#DDDDDD",
    "--chatFont": "Poppins",
    color: "#4F4F4F",
    position: "fixed",
    top: "0%",
    left: "calc(50% + 32px)",
    transform: "translate(-50%, 0%)",
    height: "min(100vh , 1100px)",
    maxWidth: "2000px",
    width: "calc(100% - 65px)",

    overflow: "hidden",
    borderBlock: "unset",
    background: "white",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, .2)",
    borderRadius: "10px",
    transition: "all .3s ease-in-out",
    [theme.breakpoints.down("md")]: {
      width: "calc(100%)",
      left: "50%",
    },

    "*": {
      boxSizing: "border-box",
      "& *": {
        fontFamily: "var(--chatFont), sans-serif !important",
      },
    },

    "& span.userTagged": {
      backgroundColor: "#c5ecf1",
      color: "#00796b",
      padding: "2px 4px",
      marginRight: "2px",
      whiteSpace: "nowrap",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      borderRadius: "2px",
    },
  };
});
export const GridMaxHeightStyled = styled(Grid)(({ theme, className }) => ({
  height: "calc(100% - var(--headerHeight))",
}));
export const GridMinHeightStyled = styled(Grid)(({ theme }) => ({
  height: "var(--headerHeight)",
  borderBottom: `1px solid var(--mainColor)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

/* common */
export const PaddingBoxStyled = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(1.5),
  maxWidth: "100%",
}));

import { PublishedWithChanges, SaveAs, Unpublished } from "@mui/icons-material";
import { CssBaseline, Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";
import BoxCards from "../old/BoxCards";
const HeaderGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#242337",
  border: "1px solid #B3B3B3",
  color: "#fff",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
}));
const HeaderText = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
}));
const BodyGrid = styled("div")(({ theme }) => ({
  borderRight: "1px solid #B3B3B3",
  borderBottom: "1px solid #B3B3B3",
  paddingBlock: "30px",
  paddingInline: "10px",
  height: "65vh",
  overflowY: "auto",
//   display:"flex",
//   flexDirection:"column",
//   gap:"3rem",
//   "& >":{
// flex:1
//   }
}));
function Box({ heading, cardsData }) {
  return (
    <Grid container sx={{ mt: 2 }}>
      <HeaderGrid item xs={12}>
        {heading === "Draft" && <SaveAs />}
        {heading === "To be Publish" && <Unpublished />}
        {heading === "Published" && <PublishedWithChanges />}
        <HeaderText variant="h5">{heading}</HeaderText>
      </HeaderGrid>
      <BodyGrid>
        <BoxCards />
        <BoxCards />
        <BoxCards />
      </BodyGrid>
    </Grid>
  );
}

export default Box;

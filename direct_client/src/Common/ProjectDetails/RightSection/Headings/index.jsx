import { Typography, styled } from "@mui/material";
import React from "react";
const DividerOne = styled("div")(({ theme }) => ({
  width: "70px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
}));
const LeftBorder = styled("div")(({ theme }) => ({
  width: "70%",
  border: "2px solid #3787FF",
  borderRadius: "17px",
}));
const RightBorder = styled("div")(({ theme }) => ({
  width: "20%",
  border: "2px solid #3787FF",
  borderRadius: "17px",
}));

function Headings({ title }) {
  return (
    <div>
      <Typography variant="h2">{title}</Typography>
      <DividerOne>
        <LeftBorder></LeftBorder>
        <RightBorder></RightBorder>
      </DividerOne>
    </div>
  );
}

export default Headings;

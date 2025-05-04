import React from "react";
import TypographyMUI from "../../MUI/TypographyMUI";
import { styled } from "@mui/material";
const Item = styled("div")(({ theme }) => ({
  // border: "1px solid green",
  borderRadius: "7px",
  borderLeft: "6px solid green",
  paddingInline: "30px",
  paddingBlock: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "1rem",
}));
function MainPageIntro({ title, description }) {
  return (
    <div>
      <Item item xs={12}>
        <TypographyMUI variant="h2">{title}</TypographyMUI>
        <TypographyMUI color={"gray"} variant="body2">
          {description}
        </TypographyMUI>
      </Item>
    </div>
  );
}

export default MainPageIntro;

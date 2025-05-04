import { styled, Grid } from "@mui/material";
import React from "react";
import { LogoWrapper } from "@common/Logo";
const ImageLogo = styled("img")(({ theme }) => ({
  height: "130px",
  width: "130px",
  objectFit: "cover",
}));
// sdf
function SectionOne() {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      className={"signupSectionOne"}
    >
      <Grid item xs={11} className={"itemOne"}>
        <LogoWrapper width={"150px"} height={"150px"} />
        <h1>
          Development, Innovation, and Research for Evolving Cutting-edge
          Technologies
        </h1>
      </Grid>
    </Grid>
  );
}

export default SectionOne;

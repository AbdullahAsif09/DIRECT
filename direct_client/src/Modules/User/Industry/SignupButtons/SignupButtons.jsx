import { Grid } from "@mui/material";
import React from "react";
import { GridMDNone } from "@common/MUI";
import LoginComponentImage from "@common/LoginComponetImage";
import SectionOne from "./SectionOne/SectionOne.jsx";
import Sectiontwo from "./SectionTwo/SectionTwo.jsx";

function LoginCommon() {
  return (
    <div className="signup">
      <Grid container className="signupContainer">
        <GridMDNone item lg={6} xl={5.3} className="left">
          <LoginComponentImage />
        </GridMDNone>
        <Grid
          sx={{ height: "100vh" }}
          item
          md={12}
          lg={6}
          xl={6.7}
          className="right"
        >
          <Grid container rowGap={8} className="container">
            <Grid item xs={12}>
              <SectionOne />
            </Grid>
            <Grid sx={{ marginTop: "120px" }} item xs={12}>
              <Sectiontwo />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginCommon;

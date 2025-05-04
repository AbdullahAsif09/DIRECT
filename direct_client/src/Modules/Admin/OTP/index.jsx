import React, { useState } from "react";
import { Grid } from "@mui/material";
import Sectionone from "./SectionOne/Sectionone";
import LoginComponentImage from "@common/LoginComponetImage";
import { GridMDNone } from "@common/MUI";
import EmailForm from "./EmailForm";

function Otp() {
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
              <Sectionone />
            </Grid>
            <Grid item xs={12}>
              <EmailForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Otp;

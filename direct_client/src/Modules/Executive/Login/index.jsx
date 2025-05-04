import { Grid } from "@mui/material";
import Sectionone from "./SectionOne/Sectionone";
import Sectiontwo from "./SectionTwo/Sectiontwo";
import LoginComponentImage from "@common/LoginComponetImage";
import { GridMDNone } from "@common/MUI";
import { useState } from "react";
import OtpVerificationEmail from "./OTP";
function LoginDirectPortal() {
  const [emailsent, setEmailsent] = useState(false);
  console.log({ emailsent });

  return (
    <div className="signup">
      <Grid container alignItems={"stretch"} className="signupContainer">
        <GridMDNone item sm={0} md={6} lg={5.3} xl={5.3} className="left">
          <LoginComponentImage />
        </GridMDNone>
        <Grid sx={{ height: "100vh" }} item xs={12} lg={6} xl={6.7} className="right">
          <Grid container alignItems={"center"} rowGap={12} className="">
            <Grid item xs={12}>
              <Sectionone />
            </Grid>
            <Grid item xs={12}>
              {emailsent ? (
                <OtpVerificationEmail emailsent={emailsent} setEmailsent={setEmailsent} />
              ) : (
                <Sectiontwo emailsent={emailsent} setEmailsent={setEmailsent} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginDirectPortal;

import { Grid } from "@mui/material";
import InfoText from "./info";
import LoginComponentImage from "@common/LoginComponetImage";
import { BackArrowButtonComp, GridMDNone } from "@common/MUI";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI";
import SendOtpComponent from "./SendOtpComponent";
import OtpVerificationComponent from "./OtpVerificationComponent";
import ResetPasswordComponent from "./ResetPasswordComponent";

function RESETPASSWORD() {
  const { API, data, loading } = useAxios();
  const text = !data
    ? "Forgot Password"
    : data?.otpSent
    ? "Verify OTP"
    : "Reset Password";
  return (
    <div className="signup">
      <Spinner isLoading={loading} />
      <Grid container className="signupContainer">
        <GridMDNone item lg={6} xl={5.3} className="left">
          <LoginComponentImage />
        </GridMDNone>

        <Grid
          sx={{ height: "100vh" }}
          item
          xs={12}
          md={12}
          lg={6}
          xl={6.7}
          className="right"
        >
          <Grid
            container
            className="container"
            height={"100%"}
            alignItems={"start"}
          >
            <Grid item xs={12}>
              <Grid rowGap={0} container justifyContent={"center"}>
                <Grid item xs={11}>
                  <BackArrowButtonComp route={-1} />
                </Grid>
                <Grid item xs={12}>
                  <InfoText text={text} />
                </Grid>
                <Grid item xs={12}>
                  {!data ? (
                    <SendOtpComponent API={API} data={data} loading={loading} />
                  ) : null}
                  {data?.otpSent ? (
                    <OtpVerificationComponent
                      API={API}
                      data={data}
                      loading={loading}
                    />
                  ) : null}
                  {data?.token ? (
                    <ResetPasswordComponent
                      API={API}
                      data={data}
                      loading={loading}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RESETPASSWORD;

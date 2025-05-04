import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { GridMDNone } from "@common/MUI/index.jsx";
import FormComponent from "../FormComponent/index.jsx";
import LoginComponentImage from "@common/LoginComponetImage/index.jsx";
import { loginMeta, signupMeta } from "../../../utils/seocontent.js";

function SignupButtons() {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");
  const meta = isLogin ? loginMeta : signupMeta;

  return (
    <div className="signup">
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
      </Helmet>
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
            <FormComponent />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupButtons;

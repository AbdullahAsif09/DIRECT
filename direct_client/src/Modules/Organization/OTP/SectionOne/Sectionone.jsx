import { Grid } from "@mui/material";

function Sectionone() {
  return (
    <Grid container className={"signupSectionOne"}>
      <Grid item xs={12} className={"itemOne"}>
        <img src={"/assets/logo.svg"} alt="loading..." />
        <h1>Forgot Password</h1>
      </Grid>
    </Grid>
  );
}

export default Sectionone;

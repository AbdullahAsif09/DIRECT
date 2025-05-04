import { Grid } from "@mui/material";
import LocalBankAccount from "./LocalBankAccount";
import ForeignBankAccount from "./ForeignBankAccount";
import RegistrationWithGov from "./RegistrationWithGov";
import RegistrationWithDefence from "./RegistrationWithDefence";
import PerformanceDirect from "./PerformanceDirect";

function TabTwo({ profileData }) {
  return (
    <Grid container gap={6}>
      <Grid item paddingTop={2} xs={12}>
        <LocalBankAccount profileData={profileData.localBank} />
      </Grid>
      <Grid item xs={12}>
        <ForeignBankAccount profileData={profileData.foreignBank} />
      </Grid>
      <Grid item xs={12}>
        <RegistrationWithGov profileData={profileData.registerWithGov} />
      </Grid>
      {/* <Grid item xs={12}>
        <RegistrationWithDefence profileData={false} />
      </Grid> */}
      <Grid item xs={12}>
        <PerformanceDirect profileData={false} />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default TabTwo;

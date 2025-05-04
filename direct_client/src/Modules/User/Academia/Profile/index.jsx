import { Grid } from "@mui/material";
import SectionOne from "./Header";
import SectionTwo from "./SectionTwo";
import { useSelector } from "react-redux";

function Profile() {
  const profile = useSelector((state) => state.profile.profile);

  return (
    <Grid container sx={{ pt: 4, pb: 4 }} gap={4}>
      <Grid item xs={12}>
        <SectionOne profileData={profile} />
      </Grid>
      <Grid item xs={12}>
        <SectionTwo profileData={profile} />
      </Grid>
    </Grid>
  );
}

export default Profile;

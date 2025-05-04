import { Grid } from "@mui/material";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SideInfo from "./SideInfo";
import { useAxios } from "@hooks";
import { useSelector } from "react-redux";
function Profile() {
  const profile = useSelector((state) => state.profile.profile);
  if (!profile) return null;
  return (
    <Grid container rowGap={6}>
      <Grid item xs={12} sx={{ mt: 6 }}>
        <SectionOne profileData={profile} />
      </Grid>
      <Grid item xs={12}>
        <SideInfo profileData={profile} />
      </Grid>
      <Grid item xs={12}>
        <SectionTwo profileData={profile} />
      </Grid>
    </Grid>
  );
}

export default Profile;

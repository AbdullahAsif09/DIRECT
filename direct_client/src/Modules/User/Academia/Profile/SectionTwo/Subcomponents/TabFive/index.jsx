import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import CardsData from "../CardsData";
import { educationData } from "../TabOne/data";

function TabFive({ profileData }) {
  return (
    <Grid container>
      <Grid item lg={8} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <CardsData
            headingData={"Attended"}
            contentData={educationData}
            profileData={profileData.attendedSection}
            trainingSection={true}
          />
          <CardsData
            headingData={"Organized"}
            contentData={educationData}
            profileData={profileData.organizedSection}
            trainingSection
          />
        </Stack>
      </Grid>
      <Grid item lg={4} xl={3}>
        <Sidebar profileData={profileData} />
      </Grid>
    </Grid>
  );
}

export default TabFive;

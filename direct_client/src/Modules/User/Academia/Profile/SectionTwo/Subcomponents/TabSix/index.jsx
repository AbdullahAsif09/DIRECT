import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import About from "../About";
import CardsData from "../CardsData";
import Award from "../CardsData/Award";
import Scopus from "../CardsData/Scopus";
import { educationData } from "../TabOne/data";

function TabSix({ profileData }) {
  return (
    <Grid container>
      <Grid item lg={8} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <CardsData
            headingData={"PHD Supervisions"}
            contentData={educationData}
            profileData={profileData.phdSection}
            supervisionSection
          />
          <CardsData
            headingData={"MS Supervisions"}
            contentData={educationData}
            profileData={profileData.mastersSection}
            supervisionSection
          />
        </Stack>
      </Grid>
      <Grid item lg={4} xl={3}>
        <Sidebar profileData={profileData} />
      </Grid>
    </Grid>
  );
}

export default TabSix;

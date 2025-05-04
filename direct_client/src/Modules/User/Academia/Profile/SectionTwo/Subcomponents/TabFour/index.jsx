import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import CardsData from "../CardsData";
import { educationData } from "../TabOne/data";

function TabFour({ profileData }) {
  return (
    <Grid container>
      <Grid item lg={8} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <CardsData
            headingData={"Patent"}
            contentData={educationData}
            profileData={profileData.patentsSection}
            patentsSection={true}
          />
          <CardsData
            headingData={"Copy Rights"}
            contentData={educationData}
            profileData={profileData.copyRightsSection}
            copyRightsSection
          />
          <CardsData
            headingData={"Industrial Designs"}
            contentData={educationData}
            profileData={profileData.industrialDesignsSection}
            industrialDesignsSection
          />
          <CardsData
            headingData={"Technology Transfered"}
            profileData={profileData.technologyTransferedSection}
            contentData={educationData}
            technologyTransferedSection
          />
        </Stack>
      </Grid>
      <Grid item lg={4} xl={3}>
        <Sidebar profileData={profileData} />
      </Grid>
    </Grid>
  );
}

export default TabFour;

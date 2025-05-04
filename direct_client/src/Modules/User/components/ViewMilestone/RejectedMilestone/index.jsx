import { Grid } from "@mui/material";
import MilestoneRejected from "./MilestoneRejected";
import TypographyMUI from "@common/MUI/TypographyMUI";

function RejectedMilestone({ milestoneData }) {
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <TypographyMUI variant="h3" fontWeight={500}>
          {milestoneData?.title}
        </TypographyMUI>
      </Grid>
      <Grid item xs={12}>
        <MilestoneRejected dataCard={milestoneData} />
      </Grid>
    </Grid>
  );
}

export default RejectedMilestone;

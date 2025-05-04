import { Grid } from "@mui/material";
import "gantt-task-react/dist/index.css";
import AttachmentsMilestones from "./AttachmentsMilestones";
import GanttCharts from "./GanttCharts";
import Tasks from "./Tasks";
function Milestones({ milestoneDetails, milestoneFilesData }) {
  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <Tasks taskDetails={milestoneDetails} />
      </Grid>
      <Grid item xs={12}>
        <GanttCharts />
      </Grid>
      <Grid item xs={12}>
        <AttachmentsMilestones milestoneFilesData={milestoneFilesData} />
      </Grid>
    </Grid>
  );
}

export default Milestones;

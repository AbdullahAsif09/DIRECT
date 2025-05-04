import { Divider, Grid, Paper, Stack } from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Route } from "@mui/icons-material";
import TimelineMui from "@common/TimelineMui";
import { TasksProject, TasksProjectTwo } from "../../../utils/ProjectsData";
import { RatingMui } from "@common/UI";
import { useParams } from "react-router-dom";
import Editor from "@common/Editor";
function MilesStonesAdmin({ ratingAdd, editor }) {
  const { id } = useParams();
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid container gap={2} sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <IconsHeadings
              text={"Milestones"}
              icons={<Route sx={{ color: "#252B42" }} />}
            />
            {ratingAdd && <RatingMui />}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {id == 90785644
            ? TasksProjectTwo?.map((e, i) => <TimelineMui timelineData={e} />)
            : TasksProject?.map((e, i) => <TimelineMui timelineData={e} />)}
        </Grid>

        <Grid item xs={12}>
          <Divider
            sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
            flexItem
          />
        </Grid>
        <Grid item xs={12}>
          {editor && (
            <Editor
              gap={1}
              required={true}
              label={"Remarks"}
              labelSize={"1.1rem"}
              labelWeight={600}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MilesStonesAdmin;

import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Card, Grid, Stack } from "@mui/material";
import DataGrids from "@common/TableMui/DataGrids";
import { useParams } from "react-router-dom";
import data from "./data";
import { useAxios } from "@hooks";

function Milestones() {
  const { id: projectID } = useParams();
  const { data: d } = useAxios(`departments/getProjectMilestones`, "post", {
    projectID,
  });
  const projectData = d?.result?.map((e, i) => ({
    ...e,
    id: i + 1,
  }));

  const columns = data(projectID);
  // for new values coming from mongodb stream

  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        ></Stack>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={6}>
          <MainHeadings
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "20px",
            }}
            variant={"h2"}
            text={"Milestones"}
          />
          <DataGrids toolBarGrid dataRow={projectData} dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Milestones;

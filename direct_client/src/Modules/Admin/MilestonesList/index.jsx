import { Grid } from "@mui/material";
import Milestones from "./Milestones";
import ProjectNameWithoutTabs from "@common/Admin/ProjectNameWithoutTabs";
import { useParams } from "react-router-dom";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI";

function MilestonesList() {
  const { id } = useParams();
  const { data, loading } = useAxios(`projects/getOneProject?id=${id}`);

  return (
    <Grid container gap={6} sx={{ pt: 8, pb: 4 }}>
      <Spinner isLoading={loading} />
      <Grid item xs={12}>
        {data?.result && <ProjectNameWithoutTabs dataProject={data?.result} />}
      </Grid>
      <Grid item xs={12}>
        {data?.result && <Milestones />}
      </Grid>
    </Grid>
  );
}

export default MilestonesList;

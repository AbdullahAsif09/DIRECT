import { Grid } from "@mui/material";
import Proposals from "./Proposals";
import ProjectNameWithoutTabs from "@common/Admin/ProjectNameWithoutTabs";
import { useParams } from "react-router-dom";
import { useAxios } from "@hooks";

function ProposalList() {
  const { id } = useParams();
  const { data: projectData } = useAxios(
    `projects/getOneProject?id=${id}`,
    "get"
  );
  return (
    <Grid container gap={6} sx={{ pt: 8, pb: 4 }}>
      <Grid item xs={12}>
        {projectData?.result && (
          <ProjectNameWithoutTabs dataProject={projectData?.result} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Proposals />
      </Grid>
    </Grid>
  );
}

export default ProposalList;

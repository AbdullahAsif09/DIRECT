import { Grid } from "@mui/material";
import ProjectName from "@common/ProjectName";
import { useState } from "react";
import ProposalTable from "./ProposalTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectDetails from "./ProjectDetails";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI";

const arrayTabs = ["Project Details", "Proposals"];
function ProposalLists() {
  const profile = useSelector((state) => state.profile.profile);
  const { id: projectId } = useParams();
  const [value, setValue] = useState(0);

  const { data, loading } = useAxios("projects/getProjectForReviewer", "post", {
    id: projectId,
  });
  const { data: d } = useAxios("reviewer/findAllProposals", "post", {
    id: profile?._id,
  });
  const ProposalData = d?.result?.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const ProjectData = data?.result;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container gap={4} sx={{ mt: 6, mb: 4 }}>
      <Spinner isLoading={loading} />
      <Grid item xs={12}>
        {ProjectData && (
          <ProjectName
            value={value}
            projectData={ProjectData}
            handleChange={handleChange}
            arrayTabs={arrayTabs}
          />
        )}
      </Grid>
      {value === 0 && (
        <Grid item xs={12}>
          {ProjectData && <ProjectDetails ProjectData={ProjectData} />}
        </Grid>
      )}
      {value === 1 && (
        <Grid item xs={12}>
          {ProposalData.length > 0 && (
            <ProposalTable ProposalData={ProposalData} />
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default ProposalLists;

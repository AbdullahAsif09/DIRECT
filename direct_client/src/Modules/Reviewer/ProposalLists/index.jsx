import { Grid } from "@mui/material";
import ProjectName from "@common/ProjectName";
import { useState } from "react";
import ProposalTable from "./ProposalTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectDetails from "./ProjectDetails";
import { useAxios } from "@hooks";
import { useGetRole } from "@hooks/index";

const arrayTabs = ["Project Details", "Proposals"];
function ProposalLists() {
  const { id: projectId } = useParams();
  const role = useGetRole();
  console.log(role, "role");
  // if()
  const profile = useSelector((state) => state.profile.profile);
  console.log(profile, "profile");
  const [value, setValue] = useState(0);
  const { data } = useAxios("projects/getProjectForReviewer", "POST", {
    id: projectId,
  });
  let profileID;
  if (role === "industry" || role === "academia") {
    profileID = profile?.[role]?._id;
  } else {
    profileID = profile?._id;
  }
  const { data: d } = useAxios("reviewer/findProjectProposals", "POST", {
    userID: profileID,
    projectID: projectId,
  });
  console.log(d, "data");
  const ProposalData = d?.result?.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  const ProjectData = data?.result;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container gap={4} sx={{ mt: 6, mb: 4 }}>
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

import { Grid } from "@mui/material";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProjectName from "../ProjectName";
import TechInfo from "./Tabs/TechInfo";
import CustomizableFields from "./Tabs/Customizable fields";
import Background from "./Tabs/Background";
import BriefIntro from "./Tabs/BriefIntro";
import { useAxios } from "@hooks";
import { ErrorContentAtCenterOfView, Spinner } from "../UI";
import { useSelector } from "react-redux";

function ProjectDetails() {
  const { id } = useParams();
  const [Tab, setTab] = useState(0);
  const { pathname } = useLocation();
  const profile = useSelector((state) => state?.profile?.profile);
  const handleChange = (e, v) => setTab(v);
  const { data, loading } = useAxios(`projects/getOneProject?id=${id}`);
  if ((data?.type === "failure" || !data) && !loading)
    return (
      <ErrorContentAtCenterOfView code={404} message={"Resource Not Found!"} />
    );
  const projectData = data?.result;
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Spinner isLoading={loading} />
      <Grid item xs={12} pt={5}>
        <ProjectName
          value={Tab}
          projectData={projectData}
          handleChange={handleChange}
          arrayTabs={[
            "Brief Introduction",
            "Background",
            "Technical Information",
            "Documents",
          ]}
          buttonContent={
            profile?.role?.[0] === "super" ? false : "Send Proposal"
          }
          navigationButton={
            pathname.includes("/user/industry/")
              ? `/user/industry/addproposal/${id}`
              : `/user/academia/addproposal/${id}`
          }
        />
      </Grid>
      <Grid item xs={12}>
        {Tab === 0 && (
          <BriefIntro projectData={projectData} profile={profile} />
        )}
        {Tab === 1 && <Background projectData={projectData} />}
        {Tab === 2 && <TechInfo projectData={projectData} />}
        {Tab === 3 && <CustomizableFields projectData={projectData} />}
      </Grid>
    </Grid>
  );
}

export default ProjectDetails;

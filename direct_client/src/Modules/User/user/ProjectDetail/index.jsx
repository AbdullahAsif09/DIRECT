import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ProjectName from "./ProjectName/ProjectName";
import DetailComp from "./Detail";
import ProjectTask from "./Tasks";
import Members from "./Members";
import ProjectFile from "./Files";
import Activity from "./Activity";
import { useAxios } from "@hooks";
import { useDispatch } from "react-redux";
import { setProject } from "@store/Features/usr";
import { Spinner } from "@common/UI";
import { useParams } from "react-router-dom";
const staticProjectData = {
  title: "Webflow events site opera.gallery",
  description:
    "This is a brief description of the static project. It gives an overview of what the project is about.",
  status: "Completed",
  image: img,
  tabs: [
    "Project Details",
    "Task",
    "Members",
    "Files",
    "Activity",
    "Milestone",
  ],
};

const img = "/assets/pmgtd-logo.svg";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data, loading } = useAxios(`user/getProject?id=${id}`, "GET");
  const dispatch = useDispatch();
  dispatch(setProject(data?.data));
  const [Tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  if (loading) {
    return <Spinner isLoading={loading} />;
  }
  return (
    <Grid container pt={2} pb={5}>
      <Typography variant="h3" py={2}>
        Projects
      </Typography>
      <Grid item xs={12} pt={2}>
        <ProjectName
          value={Tab}
          handleChange={handleChange}
          arrayTabs={staticProjectData.tabs}
          buttonContent={"Send Proposal"}
          navigationButton={"/static/navigation/path"}
        />
      </Grid>
      <Grid item xs={12}>
        {Tab === 0 && <DetailComp />}
        {Tab === 1 && <ProjectTask />}
        {Tab === 2 && <Members />}
        {Tab === 3 && <ProjectFile />}
        {Tab === 4 && <Activity />}
      </Grid>
    </Grid>
  );
};

export default ProjectDetail;

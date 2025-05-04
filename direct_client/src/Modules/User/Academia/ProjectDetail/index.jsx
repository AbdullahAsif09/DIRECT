import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ProjectName from "./ProjectName/ProjectName";
import DetailComp from "./Detail";
import ProjectTask from "./Tasks";
import Members from "./Members";
import ProjectFile from "./Files";
import Activity from "./Activity";
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
    "Settings",
  ],
};

const img = "/assets/pmgtd-logo.svg";

const ProjectDetail = () => {
  const [Tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Grid container pt={2} pb={5}>
      <Typography variant="h3" py={2}>
        Projects
      </Typography>
      <Grid item xs={12} pt={2}>
        <ProjectName
          value={Tab}
          projectData={staticProjectData}
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

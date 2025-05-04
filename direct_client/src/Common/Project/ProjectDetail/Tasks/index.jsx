import React from "react";
import TaskHeader from "./Header/TaskHeader";
import { Grid } from "@mui/material";
import { taskData } from "../../../../utils/ProjectsData";
import TaskCard from "./Cards/TaskCard";
import { useGetQueryParam } from "@hooks";
const ProjectTask = ({ MilestonesData }) => {
  const milestoneID = useGetQueryParam("milestones");
  return (
    <Grid container pb={5} pt={3}>
      <TaskHeader />
      <Grid container spacing={2} mt={2}>
        {MilestonesData?.map((project, index) => (
          <TaskCard
            key={index}
            index={index}
            milestoneId={milestoneID}
            status={project.status}
            projectName={project.title}
            discription={project.description}
            dueDate={project.dueDate}
            duration={project.duration}
            budget={project.payment}
            files={project.files}
            progress={project.progress}
            collaborators={project.collaborators}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProjectTask;

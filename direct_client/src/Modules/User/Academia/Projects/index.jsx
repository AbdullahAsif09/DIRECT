import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from "./Cards/ProjectCard";
import { projectData } from "../Dashboard/Data/projects";
import ProjectsHeader from "./Header";
import { Link } from "react-router-dom";
const ProjectManagement = () => {
  return (
    <Grid container pt={5} pb={5}>
      <Typography variant="h3" py={3}>
        Projects
      </Typography>
      {/* header  */}
      <ProjectsHeader />
      {/* cards  */}

      <Grid container spacing={2} mt={4}>
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            logo={project.logo}
            status={project.status}
            projectType={project.projectType}
            projectName={project.projectName}
            dueDate={project.dueDate}
            budget={project.budget}
            tasks={project.tasks}
            progress={project.progress}
            collaborators={project.collaborators}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProjectManagement;

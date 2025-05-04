import { Grid } from "@mui/material";
import React from "react";
import ProjectName from "./Header/PorjectName";
import AllProjects from "./AllProjects";
import { useAxios } from "@hooks";
import { useDispatch } from "react-redux";
import { setProject } from "@store/Features/usr";
import { useParams } from "react-router-dom";
import { Spinner } from "@common/UI";

const Projects = () => {
  const { id } = useParams();
  const { data, loading, error } = useAxios(`user/getProject?id=${id}`, "GET");
  const dispatch = useDispatch();
  dispatch(setProject(data?.data));
  if (loading) return <Spinner isLoading={loading} />;
  return (
    <Grid container pt={5} pb={5}>
      <Grid item xs={12} pt={2}>
        <ProjectName />
      </Grid>
      <Grid item xs={12} pt={2}>
        <AllProjects />
      </Grid>
    </Grid>
  );
};

export default Projects;

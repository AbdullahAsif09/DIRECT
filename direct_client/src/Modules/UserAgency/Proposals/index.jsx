import { Grid } from "@mui/material";
import React from "react";
import ProjectName from "./Header/PorjectName";
import AllProjects from "./AllProjects";
import { useAxios } from "@hooks";
import { useDispatch } from "react-redux";
import { setProject } from "@store/Features/userAgency";
import { useParams } from "react-router-dom";
import { Spinner } from "@common/UI";

const Projects = () => {
  const { id } = useParams();
  const { data, loading } = useAxios(`userAgency/getProject?id=${id}`, "POST", {
    id: id,
  });
  const dispatch = useDispatch();
  dispatch(setProject(data?.data));
  return (
    <Grid container pt={5} pb={5}>
      <Spinner isLoading={loading} />
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

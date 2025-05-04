import React from "react";
import ProjectsCarousel from "../LandingPage/ProjectsCarousel";
import { useAxios } from "@hooks/index";

function Projects() {
  const { data, loading } = useAxios(`projects/getprojects`);

  return <ProjectsCarousel projectData={data?.result} loading={loading} />;
}

export default Projects;

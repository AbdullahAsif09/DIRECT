import { Divider, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const ProjectName = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "15px",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,

  ["@media screen and (max-width: 1450px)"]: {
    fontSize: "16px",
  },
}));

function RightsideProjects({ data, isLast }) {
  return (
    <div>
      <ProjectName variant="h5">{data?.title}</ProjectName>
      <Divider
        sx={{
          backgroundColor: "white",
          marginTop: "25px",
          display: isLast ? "none" : undefined,
        }}
      />
    </div>
  );
}

export default RightsideProjects;

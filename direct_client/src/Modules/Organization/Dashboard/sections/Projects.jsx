import {
  Grid,
  Box,
  Typography,
  Avatar,
  Stack,
  LinearProgress,
  Chip,
  Divider,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { keys } from "@config";

const getColorStatus = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "in progress":
      return "primary";
    case "on hold":
      return "warning";
    case "outdated":
      return "error";
    default:
      return "default";
  }
};
const handleAggregate = (dataArray, key) =>
  dataArray?.reduce((acc, milestone) => {
    return acc + milestone[key];
  }, 0);
const handleProgress = (dataArray) => {
  if (dataArray?.length < 1) return;
  const totalProgress = dataArray?.reduce((acc, milestone) => {
    return acc + milestone?.progress;
  }, 0);
  const averageProgress = totalProgress / dataArray?.length;
  return averageProgress;
};
const Projects = ({ data }) => {
  const overallProgress = data?.milestones?.[0]?.details?.reduce(
    (prev, next) => prev + next?.progress
  );
  return (
    <Grid container marginTop={2} gap={2}>
      {data?.length === 0 || !data ? "No projects found" : null}
      {data?.map((project) => (
        <CardStyled item xs={12} sm={12} md={5.8} lg={3.8} key={project?._id}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={0.5}
            >
              <Avatar
                src={keys.rootserver + project?.image?.[0]}
                variant="square"
                sx={{ width: 35, height: 35, borderRadius: "5px" }}
              />
              <Typography variant="h4" fontWeight={600}>
                {project?.title}
              </Typography>
            </Stack>

            <Chip
              label={"completed"}
              color={getColorStatus("completed")}
              size="small"
            />
          </Box>
          <Divider sx={{ marginY: 2 }} />

          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Department Alloted:</strong> {project?.department?.name}
            </Typography>
            <Typography variant="body2">
              <strong>Duration:</strong>{" "}
              {handleAggregate(project?.milestones?.[0]?.details, "duration") ??
                "Project not assigned" + " Months"}
            </Typography>
            <Typography variant="body2">
              <strong>Budget:</strong>{" "}
              {handleAggregate(project?.milestones?.[0]?.details, "cost") ??
                "Project not assigned"}
            </Typography>

            <Typography variant="body2">
              <strong>Tasks:</strong>{" "}
              {project?.milestones?.[0]?.details?.length ??
                "Project not assigned"}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={
              project?.milestones?.[0]?.details
                ? handleProgress(project?.milestones?.[0]?.details)
                : 0
            }
            sx={{ marginTop: 2 }}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            marginTop={2}
          >
            <Typography variant="body2">
              {project?.milestones?.[0]?.details
                ? handleProgress(project?.milestones?.[0]?.details)
                : 0}
              %
            </Typography>
          </Box>
        </CardStyled>
      ))}
    </Grid>
  );
};

export default Projects;

const CardStyled = styled(Grid)({
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

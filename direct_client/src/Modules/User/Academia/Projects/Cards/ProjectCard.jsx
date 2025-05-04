import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import WebOutlinedIcon from "@mui/icons-material/Web";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCart";
import EmailOutlinedIcon from "@mui/icons-material/Email";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "#0DA678";
    case "in progress":
      return "#FFA500";
    case "outdated":
      return "#FF0000";
    default:
      return "#000000";
  }
};

const ProjectCard = ({
  logo,
  projectType,
  projectName,
  dueDate,
  budget,
  tasks,
  files,
  progress,
  collaborators,
  status,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <Grid item xs={12} lg={4} md={6}>
      <Card
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "8px",
        }}
      >
        <CardContent sx={{ padding: "15px 8px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "3px ",
                borderRadius: "16px",
              }}
            >
              {logo ? (
                <Avatar
                  src={logo}
                  sx={{ width: 30, height: 30, marginRight: 1 }}
                />
              ) : (
                ""
              )}
              <Typography sx={{ fontSize: 15 }}>{projectName}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: statusColor,
                color: "#fff",
                padding: "2px 10px",
                borderRadius: "16px",
              }}
            >
              <Typography sx={{ fontSize: 10 }}>{status}</Typography>
            </Box>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>{projectType}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Due Date: <strong>{dueDate}</strong>
              </Typography>
            </Grid>
            {budget ? (
              <Grid item>
                <Typography>
                  Budget: <strong>{budget}</strong>
                </Typography>
              </Grid>
            ) : (
              ""
            )}

            <Grid item>
              <Typography>
                Files: <strong>{files}</strong>
              </Typography>
            </Grid>
            <Grid item>
              <LinearProgress variant="determinate" value={progress} />
            </Grid>
            <Grid container width={"100%"} px={2} py={2}>
              {collaborators.map((collaborator, index) => (
                <Avatar
                  key={index}
                  src={collaborator}
                  sx={{
                    width: 35,
                    height: 35,
                    border: "2px solid white",
                    marginLeft: index > 0 ? "-8px" : "",
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;

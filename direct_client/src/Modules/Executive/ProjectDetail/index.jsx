import { Avatar, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { project_logo } from "../../../../public/assets/icons";
import ShareIcon from "@mui/icons-material/Share";
import Overview from "./Overview";
import Milestones from "./Milestones";
import styled from "styled-components";
const ProjectDetail = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Grid container pt={5} pb={5}>
      <Grid container>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <ArrowBackIcon />
          <Typography variant="h2">Projects</Typography>
        </Stack>
        {/* project name card  */}
        <Stack
          width={"100%"}
          padding={2}
          gap={2}
          marginTop={2}
          paddingBottom={0}
          borderRadius={"5px"}
          boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px;"}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item sx={12} sm={12} md={5}>
              <Stack flexDirection={"row"} gap={1} alignItems={"start"}>
                <Box component={"img"} src={project_logo} />
                <Stack gap={2}>
                  <Typography variant="h2">
                    Webflow events site opera.gallery
                  </Typography>
                  <Typography variant="body2">
                    Create new site for opera.gallery in Webflow from research
                    and tests to final deliverables docs.
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    background: "#0DA678",
                    borderRadius: "10px",
                    padding: "2px",
                    marginTop: 1,
                  }}
                >
                  <Typography variant="body1" fontSize={"10px"} color={"white"}>
                    Completed
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item>
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Stack flexDirection={"row"}>
                  <Avatar src="https://randomuser.me/api/portraits/women/55.jpg" />
                  <Avatar
                    sx={{ marginLeft: "-10px" }}
                    src="https://randomuser.me/api/portraits/women/40.jpg"
                  />
                  <Avatar
                    sx={{ marginLeft: "-10px" }}
                    src="https://randomuser.me/api/portraits/women/30.jpg"
                  />
                </Stack>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  border={"1px solid gray"}
                  borderRadius={"5px"}
                  padding={0.4}
                >
                  <Typography>Share</Typography>
                  <ShareIcon fontSize="10px" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          {/* tabs  */}

          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="dashboard tabs"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#0DA678" },
              "& .MuiTab-root": { color: "black" },
              "& .MuiTab-root.Mui-selected": { color: "#0DA678" },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Milestones" />
            <Tab label="Members" />
            <Tab label="Files" />
            <Tab label="Activity" />
          </Tabs>
        </Stack>
      </Grid>
      {tab === 0 && <Overview />}
      {tab === 1 && <Milestones />}
    </Grid>
  );
};

export default ProjectDetail;



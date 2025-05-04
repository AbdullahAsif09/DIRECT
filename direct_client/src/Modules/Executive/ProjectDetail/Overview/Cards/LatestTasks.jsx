import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography, LinearProgress, Grid } from "@mui/material";

const columns = [
  {
    field: "tasks",
    headerName: "Tasks",
    width: 250,
  },
  {
    field: "assignees",
    headerName: "Assignees",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {params.value.map((assignee, index) => (
          <Avatar key={index} src={assignee.avatar} sx={{ marginLeft: -1 }}>
            {assignee.initials}
          </Avatar>
        ))}
      </Box>
    ),
  },
  {
    field: "progress",
    headerName: "Progress",
    width: 150,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginRight: 1 }}
        >
          {params.value}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={params.value}
          sx={{
            width: "100%",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#10D096",
            },
          }}
        />
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    tasks: "Copywriting for all pages",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/men/51.jpg",
        initials: "A",
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/52.jpg",
        initials: "B",
      },
    ],
    progress: 100,
  },
  {
    id: 2,
    tasks: "Implement online booking",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/men/53.jpg",
        initials: "C",
      },
    ],
    progress: 80,
  },
  {
    id: 3,
    tasks: "Implement online payment",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        initials: "D",
      },
    ],
    progress: 60,
  },
  {
    id: 4,
    tasks: "Logo redesign",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/women/60.jpg",
        initials: "E",
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        initials: "F",
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
        initials: "G",
      },
    ],
    progress: 90,
  },
  {
    id: 5,
    tasks: "Create 4 domain emails",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/women/61.jpg",
        initials: "H",
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/57.jpg",
        initials: "I",
      },
    ],
    progress: 50,
  },
  {
    id: 6,
    tasks: "Update privacy policy",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/men/58.jpg",
        initials: "J",
      },
    ],
    progress: 75,
  },
  {
    id: 7,
    tasks: "Develop new landing page",
    assignees: [
      {
        avatar: "https://randomuser.me/api/portraits/men/59.jpg",
        initials: "K",
      },
    ],
    progress: 85,
  },
];

export default function LatestTasks() {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <Grid container justifyContent={"space-between"}>
        <Typography variant="h2" gutterBottom textTransform={"uppercase"}>
          Latest Tasks
        </Typography>
        <Typography variant="body2" gutterBottom color={"#319DFF"}>
          View Detail
        </Typography>
      </Grid>
      <DataGrid
        sx={{ border: "none" }}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        hideFooter
      />
    </Box>
  );
}

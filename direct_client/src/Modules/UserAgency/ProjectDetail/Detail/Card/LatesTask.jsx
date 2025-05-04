import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
const img = "/assets/img.jpeg";

const columns = [
  {
    field: "task",
    headerName: "Task",
    width: 200,
  },
  {
    field: "assignees",
    headerName: "Assignees",
    width: 200,
    headerAlign: "center",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Avatar src={img} sx={{ width: 34, height: 34 }} />
        <Avatar src={img} sx={{ marginLeft: "-10px", width: 34, height: 34 }} />
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      let value = params.value;
      let color = "primary";

      return (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={value}
            color={color}
            sx={{ flexGrow: 1, marginRight: 1 }}
          />
          <Typography sx={{ minWidth: 35 }}>{`${value}%`}</Typography>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    task: "Copywriting for all pages",
    status: 8,
  },
  {
    id: 2,
    task: "Copywriting for all pages",
    status: 8,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        sx={{ flex: 1, textAlign: "start", padding: "5px", fontSize: "20px" }}
      >
        Latest Task
      </Typography>
      <Typography
        variant="h6"
        sx={{
          flex: 1,
          textAlign: "end",
          padding: "5px",
          fontSize: "15px",
          color: "#006DD0",
        }}
      >
        View Detail
      </Typography>
    </GridToolbarContainer>
  );
}

export default function LatesTask() {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        hideFooter
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

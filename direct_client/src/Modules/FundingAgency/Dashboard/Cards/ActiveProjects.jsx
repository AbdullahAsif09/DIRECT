import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
const img = "/assets/img.jpeg";
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 320,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={img} sx={{ marginRight: 1 }}>
          {params.value[0]}
        </Avatar>
        {params.value}
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Submission Date",
    width: 320,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 310,
  },
  {
    field: "status",
    headerName: "Status",
    width: 400,
    renderCell: (params) => {
      let value = 0;
      let color = "primary";
      value = params.value;

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
    name: "Fahad Ahmed ",
    date: "2024-05-15",
    amount: "$1300",
    status: 8,
  },
  {
    id: 2,
    name: "Abdulllah",
    date: "2024-05-14",
    amount: "$40000",
    status: 90,
  },
  {
    id: 3,
    name: "Aman Ullah",
    date: "2024-05-13",
    amount: "$40000",
    status: 40,
  },
  {
    id: 4,
    name: "Muhammad",
    date: "2024-05-13",
    amount: "$40000",
    status: 75,
  },
  {
    id: 5,
    name: "Naseer Malik",
    date: "2024-05-13",
    amount: "$40000",
    status: 85,
  },
  {
    id: 6,
    name: "Aqib",
    date: "2024-05-13",
    amount: "$40000",
    status: 10,
  },
];

export default function ActiveProjects() {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        // hideFooter
      />
    </Box>
  );
}

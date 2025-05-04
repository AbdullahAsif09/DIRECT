import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
const img = "/assets/img.jpeg";

const columns = [
  {
    field: "subAdmin",
    headerName: "Sub Admin",
    width: 470,
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
    field: "joinedDate",
    headerName: "Joined Date",
    width: 450,
  },
  {
    field: "role",
    headerName: "Role",
    width: 450,
  },
];

const rows = [
  {
    id: 1,
    subAdmin: "Fahad Ahmed",
    joinedDate: "2024-05-15",
    role: "Manager",
  },
  {
    id: 2,
    subAdmin: "Abdulllah",
    joinedDate: "2024-05-14",
    role: "Assistant",
  },
  {
    id: 3,
    subAdmin: "Aman Ullah",
    joinedDate: "2024-05-13",
    role: "Supervisor",
  },
  {
    id: 4,
    subAdmin: "Muhammad",
    joinedDate: "2024-05-13",
    role: "Coordinator",
  },
  {
    id: 5,
    subAdmin: "Naseer Malik",
    joinedDate: "2024-05-13",
    role: "Administrator",
  },
  {
    id: 6,
    subAdmin: "Aqib",
    joinedDate: "2024-05-13",
    role: "Clerk",
  },
];

export default function SubAdmins() {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Typography variant="h2" gutterBottom textTransform={"uppercase"}>
        Sub-Admins
      </Typography>
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

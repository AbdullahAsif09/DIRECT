import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
const img = "/assets/img.jpeg";

const columns = [
  {
    field: "AgencyName",
    headerName: "Agency Name",
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
    field: "TotalBudget",
    headerName: "Total Budget",
    width: 320,
  },
  {
    field: "BudgetRelease",
    headerName: "Budget Release",
    width: 310,
  },
  // {
  //   field: "RemainingPayments",
  //   headerName: "Remaining Payments",
  //   width: 310,
  // },
];

const rows = [
  // {
  //   id: 1,
  //   AgencyName: "Fahad Ahmed",
  //   TotalBudget: "$5000",
  //   BudgetRelease: "$45000",
  //   RemainingPayments: "$1300",
  // },
  {
    id: 1,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 17,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
  {
    id: 2,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 6,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
  {
    id: 3,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 6,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
  {
    id: 4,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 3,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
  {
    id: 5,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 10,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
  {
    id: 6,
    AgencyName: "RDE MoDP",
    TotalBudget: "PKR 50,000,000",
    BudgetRelease: "PKR 7,000,000",
    RemainingPayments: "PKR 40,000,000",
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        sx={{ flex: 1, textAlign: "start", padding: "5px", fontSize: "20px" }}
      >
        Project Funding Agency
      </Typography>
    </GridToolbarContainer>
  );
}

export default function AgencyCard() {
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#fff",
      }}
      marginTop={4}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

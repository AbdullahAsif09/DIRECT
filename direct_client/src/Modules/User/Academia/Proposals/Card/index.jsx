import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { green, red } from "@mui/material/colors";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
const columns = [
  {
    field: "name",
    headerName: "Project Name",
    width: 420,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>{params.value}</Box>
    ),
  },
  {
    field: "subdate",
    headerName: "Submitted Date",
    width: 220,
  },
  {
    field: "duedate",
    headerName: "Due Date",
    width: 220,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      let bgColor;
      let Icon;
      if (params.value === "draft") {
        bgColor = "#787878";
      }
      if (params.value === "pending") {
        bgColor = red[500];
      }
      if (params.value === "completed") {
        bgColor = green[500];
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: bgColor,
            color: "#fff",
            padding: "3px 10px",
            borderRadius: "8px",
          }}
        >
          <Typography sx={{ fontSize: 12 }}>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "options",
    headerName: "Options",
    width: 200,
    headerAlign: "right",
    renderCell: (params) => <OptionsMenu />,
  },
];

const rows = [
  {
    id: 1,
    name: "Throwable Ball Camera",
    subdate: "2024-05-15",
    duedate: "2024-08-15",
    status: "completed",
  },
  {
    id: 2,
    name: "Mechanical Mine Field Breaching System",
    subdate: "2024-05-14",
    duedate: "2024-08-15",
    status: "completed",
  },
  {
    id: 3,
    name: "Virtual reality training simulator for critical multi-operator vehicle (Indigenous Development of Virtual Reality Simulator Tank VT4)",
    subdate: "2024-05-13",
    duedate: "2024-08-15",
    status: "pending",
  },
  {
    id: 4,
    name: "Indigenous Dev of Ground Surveillance Indigenous Development Of Ground Surveillance Radar NR-V3 (MAHZ-1)(GSR) NR-V3",
    subdate: "2024-05-13",
    duedate: "2024-08-15",
    status: "draft",
  },
  {
    id: 5,
    name: "Surveillance Indigenous Development",
    subdate: "2024-05-13",
    duedate: "2024-08-15",
    status: "completed",
  },
];

function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box width={"100%"} textAlign={"right"}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ModeEditOutlineIcon sx={{ fontSize: "18px", marginRight: "4px" }} />{" "}
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ fontSize: "18px", marginRight: "4px" }} />
          View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon sx={{ fontSize: "18px", marginRight: "4px" }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 3 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function AllProposals() {
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <DataGrid
        sx={{ padding: 3 }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        autoHeight
        checkboxSelection
      />
    </Box>
  );
}

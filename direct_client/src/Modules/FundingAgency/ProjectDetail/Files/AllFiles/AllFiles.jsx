import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import SvgIcon from "@mui/icons-material/Image";
import AiIcon from "@mui/icons-material/Brush";
import DocIcon from "@mui/icons-material/Description";
import { textAlign } from "@mui/system";
import { useState } from "react";

const fileIcons = {
  pdf: <PdfIcon sx={{ color: "#D32F2F" }} />,
  svg: <SvgIcon sx={{ color: "#FF9800" }} />,
  ai: <AiIcon sx={{ color: "#FFEB3B" }} />,
  doc: <DocIcon sx={{ color: "#1976D2" }} />,
};

const columns = [
  {
    field: "totalFiles",
    headerName: "Total Files",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {fileIcons[params.value] || <Avatar>{params.value[0]}</Avatar>}
        <Typography sx={{ marginLeft: 1 }}>{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: "forTask",
    headerName: "For Task",
    width: 300,
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    width: 300,
  },
  {
    field: "date",
    headerName: "Date",
    width: 270,
  },
  {
    field: "options",
    headerName: "Options",
    width: 260,
    headerAlign: "right",
    renderCell: (params) => <OptionsMenu />,
  },
];

const rows = [
  {
    id: 1,
    totalFiles: "pdf",
    forTask: "Copywriting for all pages",
    updatedBy: "Fahad Ahmed",
    date: "2024-05-15",
  },
  {
    id: 2,
    totalFiles: "doc",
    forTask: "Design mockups",
    updatedBy: "Abdullah",
    date: "2024-05-14",
  },
  {
    id: 3,
    totalFiles: "ai",
    forTask: "Logo design",
    updatedBy: "Aman Ullah",
    date: "2024-05-13",
  },
  {
    id: 4,
    totalFiles: "svg",
    forTask: "Icon creation",
    updatedBy: "Muhammad",
    date: "2024-05-13",
  },
  {
    id: 5,
    totalFiles: "pdf",
    forTask: "Brochure content",
    updatedBy: "Naseer Malik",
    date: "2024-05-13",
  },
  {
    id: 6,
    totalFiles: "doc",
    forTask: "Meeting notes",
    updatedBy: "Aqib",
    date: "2024-05-13",
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
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{paddingBottom:2}}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function AllFiles() {
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
      sx={{padding:"15px"}}
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

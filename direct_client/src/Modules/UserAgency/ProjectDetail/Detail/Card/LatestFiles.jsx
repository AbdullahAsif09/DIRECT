import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import SvgIcon from '@mui/icons-material/Image';
import AiIcon from '@mui/icons-material/Brush';
import DocIcon from '@mui/icons-material/Description';

const fileIcons = {
  pdf: <PdfIcon sx={{ color: '#D32F2F' }} />,  

  svg: <SvgIcon sx={{ color: '#FF9800' }} />,  

  ai: <AiIcon sx={{ color: '#FFEB3B' }} />,    
  
  doc: <DocIcon sx={{ color: '#1976D2' }} />,  
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
    field: "updatedBy",
    headerName: "Updated By",
    width: 200,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    totalFiles: "pdf",
    updatedBy: "Fahad Ahmed",
    date: "2024-05-15",
  },
  {
    id: 2,
    totalFiles: "doc",
    updatedBy: "Abdullah",
    date: "2024-05-14",
  },
  {
    id: 3,
    totalFiles: "ai",
    updatedBy: "Aman Ullah",
    date: "2024-05-13",
  },
  {
    id: 4,
    totalFiles: "svg",
    updatedBy: "Muhammad",
    date: "2024-05-13",
  },
  {
    id: 5,
    totalFiles: "pdf",
    updatedBy: "Naseer Malik",
    date: "2024-05-13",
  },
  {
    id: 6,
    totalFiles: "doc",
    updatedBy: "Aqib",
    date: "2024-05-13",
  },
];

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Typography
          variant="h6"
          sx={{ flex: 1, textAlign: "start", padding: "5px", fontSize: "20px" }}
        >
          Latest Files
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
export default function LatestFiles() {
  return (
    <Box sx={{ height: 500, width:"100%" }}>
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

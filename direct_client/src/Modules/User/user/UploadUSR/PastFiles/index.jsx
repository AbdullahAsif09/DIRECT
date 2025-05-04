import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import SvgIcon from "@mui/icons-material/Image";
import AiIcon from "@mui/icons-material/Brush";
import DocIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
const fileIcons = {
  pdf: <PdfIcon sx={{ color: "#D32F2F" }} />,
  svg: <SvgIcon sx={{ color: "#FF9800" }} />,
  png: <SvgIcon sx={{ color: "#FF9800" }} />,
  jpg: <SvgIcon sx={{ color: "#FF9800" }} />,
  jpeg: <SvgIcon sx={{ color: "#FF9800" }} />,
  ai: <AiIcon sx={{ color: "#FFEB3B" }} />,
  doc: <DocIcon sx={{ color: "#1976D2" }} />,
  txt: <DocIcon sx={{ color: "#1976D2" }} />,
  file: <InsertDriveFileIcon sx={{ color: "#1976D2" }} />,
};

const columns = [
  {
    field: "id",
    headerName: "Sr. No",
    width: 90,
    renderCell: (params) => <Typography>{params.value + 1}</Typography>,
  },
  {
    field: "fileName",
    headerName: "Total Files",
    flex: 1,
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {fileIcons[params.value.ext] ?? fileIcons.file}
          <Typography sx={{ marginLeft: 1 }}>{params.value.name}</Typography>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginLeft: 4 }}
        >
          {(params.row.size / 1024).toFixed(2)}
          {"KB"}
        </Typography>
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    width: 300,
    renderCell: (params) => params.value,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 2 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function PastFiles({ data }) {
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#fff",
      }}
      marginTop={4}
    >
      <Typography padding={3} variant="h5">
        Past Documents
      </Typography>
      <DataGrid
        sx={{
          padding: "15px",
          border: "none",
        }}
        rows={data}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        showCellVerticalBorder={false}
        /* disabling */
        disableColumnMenu
        disableColumnReorder
        disableVirtualization
        disableColumnFilter
      />
    </Box>
  );
}

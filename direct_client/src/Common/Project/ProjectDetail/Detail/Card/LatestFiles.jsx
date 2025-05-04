import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import SvgIcon from "@mui/icons-material/Image";
import AiIcon from "@mui/icons-material/Brush";
import DocIcon from "@mui/icons-material/Description";
import ButtonMui from "../../../../MUI/ButtonMUI";
import { Link } from "react-router-dom";
import { keys } from "@config";

const fileIcons = {
  pdf: <PdfIcon sx={{ color: "#D32F2F" }} />,

  svg: <SvgIcon sx={{ color: "#FF9800" }} />,
  jpg: <SvgIcon sx={{ color: "#FF9800" }} />,
  jpeg: <SvgIcon sx={{ color: "#FF9800" }} />,
  png: <SvgIcon sx={{ color: "#FF9800" }} />,
  webp: <SvgIcon sx={{ color: "#FF9800" }} />,

  ai: <AiIcon sx={{ color: "#FFEB3B" }} />,

  doc: <DocIcon sx={{ color: "#1976D2" }} />,
  docx: <DocIcon sx={{ color: "#1976D2" }} />,
  txt: <DocIcon sx={{ color: "#1976D2" }} />,
};

const columns = [
  {
    field: "name",
    headerName: "File",
    width: 350,
    flex: 1,
    renderCell: (params) => {
      const lastDotIndex = params.value?.lastIndexOf(".");
      const extenstion = params.value?.slice(lastDotIndex + 1);
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {fileIcons[extenstion?.toLowerCase()]}
          <Typography sx={{ marginLeft: 1 }}>{params.value}</Typography>
        </Box>
      );
    },
  },

  {
    field: "view",
    headerName: "View",
    width: 100,
    renderCell: (params) => {
      return (
        <Link to={keys.rootserver + params.value}>
          <ButtonMui>View</ButtonMui>
        </Link>
      );
    },
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
export default function LatestFiles({ milestoneFiles }) {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={milestoneFiles}
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

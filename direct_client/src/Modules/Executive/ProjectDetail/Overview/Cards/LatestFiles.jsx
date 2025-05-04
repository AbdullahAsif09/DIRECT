import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { Stack } from "@mui/system";

const fileColumns = [
  {
    field: "file",
    headerName: "Total: 43 files, 780MB space usage",
    width: 320,
    renderCell: (params) => (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value.type === "pdf" && (
            <PictureAsPdfIcon sx={{ marginRight: 1, color: "#d32f2f" }} />
          )}
          {params.value.type === "doc" && (
            <DescriptionIcon sx={{ marginRight: 1, color: "#1976d2" }} />
          )}
          {params.value.type === "img" && (
            <ImageIcon sx={{ marginRight: 1, color: "#388e3c" }} />
          )}
          {params.value.type === "default" && (
            <InsertDriveFileIcon sx={{ marginRight: 1, color: "#9e9e9e" }} />
          )}
          <Stack>
            <Typography variant="body2">{params.value.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {params.value.size}
            </Typography>
          </Stack>
        </Box>
      </Box>
    ),
  },
  {
    field: "uploadedBy",
    headerName: "Uploaded by",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={params.value.avatar} sx={{ marginRight: 1 }}>
          {params.value.initials}
        </Avatar>
        <Typography variant="body2">{params.value.name}</Typography>
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
];

const fileRows = [
  {
    id: 1,
    file: { type: "pdf", name: "PDF product page presentation", size: "50MB" },
    uploadedBy: {
      avatar: "https://randomuser.me/api/portraits/men/60.jpg",
      initials: "A",
      name: "John Doe",
    },
    date: "Nov 04, 2022",
  },
  {
    id: 2,
    file: { type: "img", name: "Latest menu icons + instances", size: "30MB" },
    uploadedBy: {
      avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      initials: "B",
      name: "Jane Smith",
    },
    date: "Nov 04, 2022",
  },
  {
    id: 3,
    file: {
      type: "doc",
      name: "Terms and Conditions + Privacy Policy",
      size: "20MB",
    },
    uploadedBy: {
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      initials: "C",
      name: "Iulian Bildea",
    },
    date: "Nov 01, 2022",
  },
  {
    id: 4,
    file: { type: "img", name: "Logo variants", size: "15MB" },
    uploadedBy: {
      avatar: "https://randomuser.me/api/portraits/men/63.jpg",
      initials: "D",
      name: "Ramone Jinga",
    },
    date: "Oct 29, 2022",
  },
  {
    id: 5,
    file: { type: "default", name: "Card icons", size: "25MB" },
    uploadedBy: {
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
      initials: "E",
      name: "Alice Johnson",
    },
    date: "Oct 29, 2022",
  },
];

export default function LatestFiles() {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h2" gutterBottom textTransform={"uppercase"}>
          Latest Files
        </Typography>
        <Typography variant="body2" gutterBottom  color={'#319DFF'}>
         View Detail 
        </Typography>
      </Grid>
      <DataGrid
        sx={{ border: "none" }}
        rows={fileRows}
        columns={fileColumns}
        disableSelectionOnClick
        autoHeight
        hideFooter
      />
    </Box>
  );
}

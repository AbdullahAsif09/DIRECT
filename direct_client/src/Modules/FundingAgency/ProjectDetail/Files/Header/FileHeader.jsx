import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileHeader = () => {
  return (
    <Grid container width={"100%"}>
      <Box
        component="label"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "200px",
          border: "2px dashed #319DFF",
          borderRadius: "8px",
          cursor: "pointer",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: "#319DFF", marginBottom: 1 }} />
        <Typography variant="h6" color="#319DFF">
          Drag and drop your files here
        </Typography>
        <Typography variant="body2" color="#319DFF">
          or click to upload (up to 10 files)
        </Typography>
        <input type="file" multiple style={{ display: "none" }} />
      </Box>
    </Grid>
  );
};

export default FileHeader;

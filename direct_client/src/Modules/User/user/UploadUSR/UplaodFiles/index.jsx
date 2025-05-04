import React, { useState, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setPastFiles } from "@store/Features/usr";
import { useAxios } from "@hooks";

const UploadFiles = () => {
  const { API } = useAxios();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...Array.from(event.dataTransfer.files)]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const sendToAdmin = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const data = await API({
        url: "user/uploadusr",
        method: "POST",
        object: formData,
      });

      if (Array.isArray(data?.data) && data?.data.length > 0) {
        dispatch(
          setPastFiles(
            data?.data?.map((data, index) => {
              const name = data.originalname.split(".");
              return {
                id: index,
                key: data._id,
                _id: data._id,
                fileName: {
                  name: name[0],
                  ext: name[1],
                },
                name: data.originalname,
                size: data.size,
                date: new Date(data.createdAt).toDateString(),
              };
            })
          )
        );
      }
      console.log("Files sent to admin");
      setFiles([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container width={"100%"}>
      <Box
        component="div"
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
        onClick={handleBoxClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <CloudUploadIcon
          sx={{ fontSize: 48, color: "#319DFF", marginBottom: 1 }}
        />
        <Typography variant="h6" color="#319DFF">
          Drag and drop your files here
        </Typography>
        <Typography variant="body2" color="#319DFF">
          or click to upload (up to 10 files)
        </Typography>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </Box>

      {files.length > 0 && (
        <List sx={{ width: "100%", marginTop: 3 }}>
          {files.map((file, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveFile(file)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Grid
        container
        width="100%"
        justifyContent={"space-between"}
        marginTop={3}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{
            textTransform: "capitalize",
            display: files.length > 0 ? undefined : "none",
          }}
          onClick={handleRemoveAllFiles}
        >
          Remove Files
        </Button>
        <Button
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: "#0077E4",
            color: "white",
            padding: "10px 15px",
            textTransform: "lowercase",
            "&:hover": {
              backgroundColor: "#4DAAFF",
            },
          }}
          onClick={() => sendToAdmin()} // please add the send logic here thanks
        >
          Send to Admin
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadFiles;

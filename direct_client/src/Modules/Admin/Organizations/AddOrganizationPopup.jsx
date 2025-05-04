import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAxios } from "@hooks/index";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

const AddOrganizationPopup = ({ open, onClose, handleNewOrganization }) => {
  const dispatch = useDispatch();
  const { api } = useAxios();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    image: undefined,
    organizationPhotoPreview: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormValues({
        ...formValues,
        image: files[0],
        organizationPhotoPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    Object.entries(formValues)?.forEach(([key, value]) => {
      if (!value) {
        dispatch(
          setAlert({
            status: "error",
            text: `Fill the ${key} field to submit the form`,
          })
        );
      }
    });
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) formData.append(key, formValues[key]);
    });

    try {
      const data = await api({
        url: "organizations/create",
        method: "post",
        object: formData,
      });
      console.log(data, "data");
      if (data?.type === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Organization created successfully!",
          })
        );
        handleNewOrganization(formValues);
        setFormValues({
          name: "",
          description: "",
          image: null,
          organizationPhotoPreview: "",
        });
        onClose();
      }
    } catch (error) {
      dispatch(
        setAlert({ status: "error", text: "Failed to create organization." })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Organization</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              position="relative"
            >
              <Avatar
                src={formValues.organizationPhotoPreview}
                alt="Organization's Photo"
                sx={{
                  width: 150, // Increased size
                  height: 150, // Increased size
                  marginBottom: 2,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow
                  border: "2px solid #ddd", // Border
                }}
              />
              <input
                hidden
                accept="image/*"
                type="file"
                id="upload-photo"
                name="image"
                onChange={handleInputChange}
              />
              <Tooltip title="Edit Photo">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  htmlFor="upload-photo"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: "calc(50% - 30px)", // Adjusted for alignment
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    padding: "6px", // Reduced size
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <EditIcon fontSize="small" /> {/* Reduced icon size */}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Organization's Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddOrganizationPopup;

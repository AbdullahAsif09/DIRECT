import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAxios } from "@hooks/index";

const AddOrganizationPopup = ({ open, onClose }) => {
  const { api } = useAxios();
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    date: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    image: null,
    organizationPhotoPreview: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
    console.log("Form Data Submitted:", formValues);
    const formData = new FormData()
    Object.keys(formValues).forEach((key) => {
      if(formValues[key])
      formData.append(key, formValues[key]);
    });

    const data = await api({
      url: "organizations/create",
      method: "post",
      object: formData,
    });
    console.log("this is the response", data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Organization</DialogTitle>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Details" />
        <Tab label="Credentials" />
      </Tabs>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          {activeTab === 0 && (
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
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
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
                      right: "calc(50% - 50px)",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <EditIcon />
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
              <Grid item xs={12}>
                <TextField
                  label="Created Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          )}
          {activeTab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Admin Name"
                  variant="outlined"
                  fullWidth
                  name="adminName"
                  value={formValues.adminName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Admin Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="adminEmail"
                  value={formValues.adminEmail}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          {activeTab === 0 ? (
            <></>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddOrganizationPopup;

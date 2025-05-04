import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useAxios } from "@hooks/index";
import { Edit } from "@mui/icons-material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import InputFields from "@common/InputFields/InputFields";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

const AddDepartmentPopup = ({ open, onClose }) => {
  const { api } = useAxios();
  const dispatch = useDispatch();
  const { id: organizationID } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    organizationID: organizationID,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormValues({
        ...formValues,
        image: files[0],
        departmentPhotoPreview: URL.createObjectURL(files[0]),
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
    delete formValues.departmentPhotoPreview;
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });
    const data = await api({
      url: "departments/create",
      method: "post",
      object: formData,
    });
    if (data?.type === "success") {
      dispatch(
        setAlert({ status: "success", text: "department has been created" })
      );
      onClose();
      return;
    }
    dispatch(setAlert({ status: "error", text: "couldn't create department" }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ p: 4 }}>
      <DialogTitle>
        <MainHeadings text={"Add New Department"} variant={"h3"} />
      </DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent="center"
              position="relative"
            >
              <Avatar
                src={formValues?.departmentPhotoPreview}
                alt="Organization's Photo"
                sx={{
                  width: 100, // Increased size
                  height: 100, // Increased size
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
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <InputFields
                label="Department Name"
                variant="outlined"
                placeholder={"Write Department Name"}
                type={"text"}
                name="name"
                value={formValues?.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                label="Description"
                variant="outlined"
                type={"textbox"}
                rows={4}
                fullWidth
                name="description"
                value={formValues?.description}
                onChange={handleInputChange}
                placeholder={"Write Description about Department"}
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

export default AddDepartmentPopup;

import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const initialAnnouncements = [
  { id: 1, title: "Announcement 1", detail: "Detail of Announcement 1" },
  { id: 2, title: "Announcement 2", detail: "Detail of Announcement 2" },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ title: "", detail: "" });

  const handleMenuOpen = (event, announcement) => {
    setAnchorEl(event.currentTarget);
    setSelectedAnnouncement(announcement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAnnouncement(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ title: "", detail: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAnnouncement = () => {
    const newId = announcements.length + 1;
    const newAnnouncement = { id: newId, ...formData };
    setAnnouncements([...announcements, newAnnouncement]);
    handleDialogClose();
  };

  const handleEdit = () => {
    console.log("Edit:", selectedAnnouncement);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete:", selectedAnnouncement);
    setAnnouncements(
      announcements.filter((item) => item.id !== selectedAnnouncement.id)
    );
    handleMenuClose();
  };

  const handleView = () => {
    console.log("View:", selectedAnnouncement);
    handleMenuClose();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "detail", headerName: "Detail", width: 500 },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => (
        <IconButton
          aria-controls="announcement-menu"
          aria-haspopup="true"
          onClick={(event) => handleMenuOpen(event, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3">Announcements</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Add Announcement
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={announcements}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            rowSelection={false}
            disableColumnMenu
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Grid>
      </Grid>

      {/* Add Announcement Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="detail"
            label="Detail"
            type="text"
            multiline
            rows={3}
            maxRows={4}
            fullWidth
            variant="outlined"
            value={formData.detail}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddAnnouncement} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="announcement-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Announcements;
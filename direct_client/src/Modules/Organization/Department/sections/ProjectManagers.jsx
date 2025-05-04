import React, { useState } from "react";
import {
  Grid,
  Menu,
  Modal,
  Avatar,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Stack, Box } from "@mui/system";
import { MoreVert, Add as AddIcon } from "@mui/icons-material";
import { useAxios } from "@hooks/index";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "name",
    headerName: "Name",
    width: 210,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} gap={1.5}>
        <Avatar src={params.row.avatar} />
        <Typography>{params.row.name}</Typography>
      </Stack>
    ),
  },
  { field: "email", headerName: "Email", width: 210 },
  { field: "phone", headerName: "Phone", width: 210 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 130,
    renderCell: () => <ActionMenu />,
  },
];

const ProjectManagers = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();

  const { data, API, loading, api } = useAxios(
    `departments/getMembers/${id}`,
    "POST"
  );
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    if (loading) return;
    e.preventDefault();

    const handleSubmitAdmin = async () => {
      Object.entries(formData).forEach(([key, value]) => {
        if (
          (!value || value == "" || value.trim()?.length === 0) &&
          key !== "role"
        ) {
          return dispatch(
            setAlert({
              status: "error",
              text: `Fill the field ${key} to submit the form`,
            })
          );
        }
      });
      const res = await api({
        url: `departments/addMember?role=departmentProjectManager`,
        method: "post",
        object: { department: id, ...formData },
      });
      if (res?.type === "success") {
        await API({ url: `departments/getMembers/${id}`, method: "POST" });

        return dispatch(
          setAlert({
            status: "success",
            text: "Department member has been created",
          })
        );
      }
      dispatch(
        setAlert({
          status: "error",
          text: "couldn't add member",
        })
      );
    };

    await handleSubmitAdmin();

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    handleClose();
  };

  const filteredRows =
    data?.result?.map((e, i) => {
      return { ...e, id: i + 1 };
    }) ?? [];

  return (
    <Grid container marginTop={3}>
      <Grid xs={12} item paddingBottom={2}>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
          Add Project Manager
        </Button>
      </Grid>
      <Grid
        xs={12}
        item
        sx={{
          border: "1px solid #dedede",
          borderRadius: "5px",
          height: "auto",
        }}
      >
        <Stack
          width={"100%"}
          justifyContent={"space-between"}
          direction={"row"}
          paddingX={2}
          paddingTop={2}
        >
          <Typography variant="h2">Project Managers</Typography>
        </Stack>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: "none", height: 400 }}
          components={{
            Toolbar: () => <GridToolbar />,
          }}
        />
      </Grid>

      {/* Modal for Adding Manager */}
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ProjectManagers;

function ActionMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

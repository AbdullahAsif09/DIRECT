import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAxios } from "@hooks/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  {
    field: "name",
    headerName: "Department Name",
    width: 250,
    flex: 1.5,
  },
  {
    field: "admin",
    headerName: "Department Head",
    width: 350,
    flex: 1,
    renderCell: (params) => {
      return params.value?.name ?? "Not Assigned";
    },
  },
  {
    field: "projects",
    headerName: "Projects",
    width: 50,
    flex: 1,
    renderCell: (params) => params.value ?? 0,
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    flex: 1,
    renderCell: (params) => <ActionMenu departmentID={params?.row?._id} />,
  },
];

const ActionMenu = ({ departmentID }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = () => {
    navigate(`/organization/dashboard/department/${departmentID}`);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </>
  );
};

export default function AllDepartments() {
  const profile = useSelector((state) => state?.profile?.profile);
  const id = profile?.organization;
  const { data } = useAxios("organizationAdmin/getDepartments?id=" + id, "get");
  const organizationDepartments = data?.organizationDepartments ?? [];

  const mapped = organizationDepartments?.map((e, i) => {
    return { id: i + 1, ...e };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={mapped}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
    </div>
  );
}

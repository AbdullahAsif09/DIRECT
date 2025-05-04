import { Avatar, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useAxios } from "@hooks/index";
import { useState } from "react";
import { keys } from "@config";

const columns = [
  { field: "id", headerName: "No", width: 50, flex: 0.2 },
  {
    field: "organization",
    headerName: "Organization Name",
    width: 250,
    flex: 1.2,
    renderCell: (params) => {
      return (
        <Stack direction={"row"} alignItems={"center"} gap={0.5}>
          <Avatar sizes="30px" src={params.value.avatar} alt="Organization" />
          <span>{params.value.name}</span>
        </Stack>
      );
    },
  },
  { field: "description", headerName: "Description", width: 250, flex: 1.2 },

  { field: "date", headerName: "Date", width: 250, flex: 1.1 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    flex: 1,
    renderCell: (params) => <ActionMenu organizationID={params?.row?._id} />,
  },
];

const ActionMenu = ({ organizationID }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/directportal/dashboard/organization/${organizationID}`);
          }}
        >
          View
        </MenuItem>
      </Menu>
    </>
  );
};

export default function AllOrganizations({ newOrganization }) {
  const { data, setData } = useAxios("organizations/list", "get");
  const transformedRows =
    data?.result?.map((organization, index) => ({
      _id: organization?._id,
      id: index + 1,
      organization: {
        avatar: keys?.rootserver + organization?.image?.[0],
        name: organization?.name,
      },
      description: organization?.description,
      date: new Date(organization?.createdAt)?.toDateString(),
    })) ?? [];
  if (
    Object.keys(newOrganization)?.length > 0 &&
    Array.isArray(transformedRows)
  ) {
    transformedRows?.push({
      date: new Date().toDateString(),
      id: transformedRows?.length + 1,
      _id: transformedRows?.length + 1,
      description: newOrganization?.description,
      organization: {
        avatar: newOrganization?.organizationPhotoPreview,
        name: newOrganization?.name,
      },
    });
  }
  return (
    <div style={{ width: "100%", minHeight: 200 }}>
      <DataGrid
        columns={columns}
        rows={transformedRows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        rowSelection={false}
        disableColumnMenu
      />
    </div>
  );
}

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useSelector } from "react-redux";
import { useAxios } from "@hooks/index";
import { useNavigate } from "react-router-dom";

const StatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "#4CAF50";
    case "on hold":
      return "#FFC107";
    case "in progress":
      return "#2196F3";
    case "cancel":
      return "#F44336";
    default:
      return "#9E9E9E";
  }
};

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "title", headerName: "Project", width: 300 },
  {
    field: "fundingAgency",
    headerName: "Funding Agency",
    width: 300,
    renderCell: (params) => (
      <TypographyMUI>
        {params?.value?.[0]?.name ?? "No Funding Agency Found"}
      </TypographyMUI>
    ),
  },
  {
    field: "userAgency",
    headerName: "User Agency",
    width: 300,
    renderCell: (params) => (
      <TypographyMUI>
        {params?.value?.[0]?.name ?? "No User Agency Found"}
      </TypographyMUI>
    ),
  },
  {
    field: "usrBy",
    headerName: "Users",
    width: 300,
    renderCell: (params) => (
      <TypographyMUI>
        {params?.value[0]?.account?.name ?? "No User found"}
      </TypographyMUI>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 190,
    renderCell: (params) =>
      params?.row?.draft ? (
        <Chip
          label={"In Draft"}
          size="small"
          sx={{
            bgcolor: StatusColor("On Hold"),
            color: "white",
            fontSize: "13px",
            padding: "2px 4px",
          }}
        />
      ) : params?.row?.published ? (
        <Chip
          label={"In Progress"}
          size="small"
          sx={{
            bgcolor: StatusColor("in progress"),
            color: "white",
            fontSize: "13px",
            padding: "2px 4px",
          }}
        />
      ) : (
        <Chip
          label={"Completed"}
          size="small"
          sx={{
            bgcolor: StatusColor("in progress"),
            color: "white",
            fontSize: "13px",
            padding: "2px 4px",
          }}
        />
      ),
  },
  {
    field: "classified",
    headerName: "Project Category",
    width: 190,
    renderCell: (params) => (
      <Chip
        label={params?.value ? "Classified" : "Unclassified"}
        size="small"
        sx={{
          bgcolor: StatusColor(params?.value ? "in progress" : "completed"),
          color: "white",
          fontSize: "13px",
          padding: "2px 4px",
        }}
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 130,
    renderCell: (e) => <ActionMenu {...e} />,
  },
];

export default function DepartmentProjects() {
  const profile = useSelector((state) => state.profile?.profile);
  const id = profile?.department;
  const { data } = useAxios(`departments/getDepartmentsProjects?id=${id}`);
  const mapped = data?.result?.map((e, i) => ({ id: i + 1, ...e })) ?? [];

  return (
    <Box
      sx={{
        border: "1px solid #dedede",
        borderRadius: "5px",
        height: "100%",
        width: "100%",
      }}
    >
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        paddingX={2}
        paddingTop={2}
        sx={{ marginBottom: "16px" }}
      >
        <Typography variant="h2">Projects</Typography>
      </Stack>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid
          rows={mapped}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ overflow: "auto", border: "none" }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
}

function ActionMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate(`/department/dashboard/projectmangent/${props?.row?._id}`);
            handleClose();
          }}
        >
          View
        </MenuItem>
      </Menu>
    </Box>
  );
}

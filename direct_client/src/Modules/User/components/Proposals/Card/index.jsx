import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@hooks";
import { useSelector } from "react-redux";
import ButtonMui from "@common/MUI/ButtonMUI";
import { keys } from "@config";

const rows = [
  {
    id: 1,
    name: "Virtual reality training simulator for critical multi-operator vehicle (Indigenous Development of Virtual Reality Simulator Tank VT4)",
    startDate: "June 30, 2022",
    endDate: "September 23, 2023",
    status: "completed",
  },
];

function OptionsMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/industry/project-detail");
  };
  return (
    <Box width={"100%"} textAlign={"right"}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ fontSize: "18px", marginRight: "4px" }} />
          View
        </MenuItem>
      </Menu>
    </Box>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 3 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function ProjectStarted() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile?.profile);
  const { data, loading, error } = useAxios(
    "proposal/findAcceptedProposalsForAcademiaIndusrty",
    "post",
    { id: profile?._id }
  );
  const [proposalsSelected, setProposalsSelected] = React.useState([]);

  const reStructureData = () => {
    if (data) {
      const req = data?.result?.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setProposalsSelected(req);
    }
  };
  React.useEffect(() => {
    reStructureData();
  }, [data]);
  const columns = [
    {
      field: "projectID",
      headerName: "Name",
      width: 420,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Avatar src={img} sx={{ marginRight: 1 }}>
          {params.value[0]}
        </Avatar> */}
          {params.value?.title}
        </Box>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {new Date(params.row?.milestones?.startDate).toDateString()}
        </Box>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 220,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {new Date(params.row?.milestones?.endDate).toDateString()}
        </Box>
      ),
    },
    {
      field: "awardedDocs",
      headerName: "Awarded Document",
      width: 220,
      renderCell: (params) => {
        const url = keys.rootserver;
        return (
          <a href={url + params.row?.awardedDocs?.url}>
            <ButtonMui sx={{ display: "flex", alignItems: "center" }}>
              View
            </ButtonMui>
          </a>
        );
      },
    },
    {
      field: "contractedDocs",
      headerName: "Contracted Document",
      width: 220,
      renderCell: (params) => {
        const url = keys.rootserver;
        return (
          <a href={url + params.row?.contractedDocs?.url}>
            <ButtonMui sx={{ display: "flex", alignItems: "center" }}>
              View
            </ButtonMui>
          </a>
        );
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 200,
      headerAlign: "left",
      renderCell: (params) => (
        <ButtonMui
          onClick={() =>
            navigate(
              `/industry/project-detail/${params?.row?.projectID?._id}?milestones=${params?.row?.milestones?._id}`
            )
          }
        >
          View
        </ButtonMui>
      ),
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        mt: 13,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <DataGrid
        sx={{ padding: 3 }}
        rows={proposalsSelected}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        autoHeight
      />
    </Box>
  );
}

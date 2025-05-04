import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 2 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function AllFiles() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      width: 90,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "projectName",
      headerName: "Project",
      width: 400,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.value.icon} />
          <Typography sx={{ marginLeft: 1 }}>{params.value.name}</Typography>
        </Box>
      ),
    },
    {
      field: "proposals",
      headerName: "Proposals",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor:
              params.value === "Completed" ? "#4CAF50" : "#2196F3",
            color: "white",
            textAlign: "center",
            width: "100%",
          }}
        >
          {params.row?.published ? "Published" : "Not Published"}
        </Box>
      ),
    },
    {
      field: "options",
      headerName: "Proposals",
      width: 240,

      headerAlign: "center",
      align: "center",

      renderCell: (params) =>
        params.row.proposals ? (
          <Button
            component={"div"}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/fundingAgency/project/${params.row._id}/propsals`);
            }}
          >
            Proposals
          </Button>
        ) : (
          <TypographyMUI>No proposal submitted yet</TypographyMUI>
        ),
    },
  ];
  const projects = useSelector((state) => state.fundingAgency.projects) ?? [];
  return (
    <Grid container pt={5} pb={5}>
      <Typography variant="h3">Projects</Typography>
      <Box
        sx={{
          width: "100%",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "#fff",
        }}
        marginTop={4}
      >
        <DataGrid
          sx={{ padding: "15px" }}
          rows={projects}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Grid>
  );
}

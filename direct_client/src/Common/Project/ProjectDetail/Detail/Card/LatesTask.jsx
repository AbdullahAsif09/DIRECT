import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TypographyMUI from "@common/MUI/TypographyMUI";

const columns = [
  {
    field: "id",
    headerName: "No.",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "title",
    headerName: "Task Name",
    width: 300,

    renderCell: (params) => (
      <TypographyMUI variant="body2" paddingRight={3} noWrap fontWeight={500}>
        {params.row.title}
      </TypographyMUI>
    ),
  },
  {
    field: "progress",
    headerName: "Progress",

    align: "right",
    headerAlign: "right",
    renderCell: (params) => (
      <Box sx={{ width: "100%" }}>
        {params.row.progress ? (
          <LinearProgressWithLabel value={`${params.row.progress}`} />
        ) : (
          <LinearProgressWithLabel value={0} />
        )}
      </Box>
    ),
    width: 300,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 200,

    align: "right",
    headerAlign: "right",
    renderCell: (params) => (
      <TypographyMUI>
        {params.row.duration ? params.row.duration + " Month" : 1 + " Month"}
      </TypographyMUI>
    ),
  },
  // {
  //   field: "detail",
  //   headerName: "View Details",

  //   align: "center",
  //   headerAlign: "center",
  //   renderCell: (params) => <Button variant={"contained"}>View</Button>,
  //   width: 200,
  // },
];

const rows = [
  {
    id: 1,
    task: "Project Planning and Research",
    status: 100,
  },
  {
    id: 2,
    task: "Final Documentation and Presentation",
    status: 100,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        sx={{ flex: 1, textAlign: "start", padding: "5px", fontSize: "20px" }}
      >
        Tasks
      </Typography>
      <Typography
        variant="h6"
        sx={{
          flex: 1,
          textAlign: "end",
          padding: "5px",
          fontSize: "15px",
          color: "#006DD0",
        }}
      >
        View Detail
      </Typography>
    </GridToolbarContainer>
  );
}

export default function LatesTask({ MilestonesData }) {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={MilestonesData ? MilestonesData : []}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        hideFooter
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}
function LinearProgressWithLabel({ value, ...rest }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ borderRadius: "10px", height: "5px" }}
          variant="determinate"
          value={Number(value)}
          {...rest}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <TypographyMUI variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</TypographyMUI>
      </Box>
    </Box>
  );
}

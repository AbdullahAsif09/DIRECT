import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import TypographyMUI from "../../../../MUI/TypographyMUI";
import ButtonMui from "../../../../MUI/ButtonMUI";
import { Download } from "@mui/icons-material";
import { keys } from "@config";

const columns = [
  {
    field: "id",
    headerName: "No.",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Reviewer",
    width: 400,
    renderCell: (param) => (
      <TypographyMUI variant="body1">{param.row?.name}</TypographyMUI>
    ),
  },
  {
    field: "url",
    headerName: "Download",
    width: 300,
    align: "center",
    headerAlign: "center",
    renderCell: (param) => {
      return (
        <ButtonMui
          component="a"
          variant="contained"
          target="_blank"
          href={keys.rootserver + param.row?.url}
          startIcon={<Download />}
        >
          Download
        </ButtonMui>
      );
    },
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 2 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function AllFiles({ data, loading }) {
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#fff",
      }}
      marginTop={4}
    >
      <DataGrid
        loading={loading}
        sx={{ padding: "15px" }}
        rows={data}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useTableColumns } from "./data";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 3 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function ProposalsList({ rows }) {
  const { columns } = useTableColumns();
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <DataGrid
        sx={{ padding: 3 }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        autoHeight
        checkboxSelection
      />
    </Box>
  );
}

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";

function GridToAdd() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 2 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];
function DataGrids({
  checkboxSelection,
  dataRow = [],
  dataColumn = [],
  toolBarGrid,
  search,
  elevation = 0,
  padding = 0,
  loading,
  title,
  sx,
  ...rest
}) {
  return (
    <Box>
      {title && (
        <Typography sx={{ mb: 2.4 }} variant="h3">
          {title}
        </Typography>
      )}
      <DataGrid
        loading={loading}
        onFilterModelChange={(model) => console.log(model, "model of table")}
        {...rest}
        slots={{
          toolbar:
            toolBarGrid == true
              ? GridToolbar
              : toolBarGrid ?? search
              ? GridToAdd
              : null,
        }}
        rowHeight={60}
        rows={dataRow ? dataRow : []}
        columns={dataColumn ? dataColumn : columns}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        // density="comfortable"
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            minHeight: 100,
          },
          ...sx,
        }}
      />
    </Box>
  );
}

export default DataGrids;

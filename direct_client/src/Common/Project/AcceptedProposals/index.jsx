import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useGetRole } from "@hooks";
import { useSelector } from "react-redux";
import { useTableColumns } from "./Table/data.jsx";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 3 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export function AcceptedProposals({ data }) {
  const role = useGetRole();
  const { columns } = useTableColumns();
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
        rows={
          data?.map((item, index) => ({
            ...item,
            id: index + 1,
            key: index,
          })) ?? []
        }
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        autoHeight
      />
    </Box>
  );
}

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useAxios, useGetRole } from "@hooks";
import { useSelector } from "react-redux";
import { useTableColumns } from "./Table/data.jsx";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 3 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export function AcceptProposals() {
  const role = useGetRole();
  const { columns } = useTableColumns();

  /* user state */
  const profile = useSelector((state) => state.profile?.profile);
  let profileID;
  if (role === "academia") {
    profileID = profile?.academia?._id;
  }
  if (role === "industry") {
    profileID = profile?.industry?._id;
  }
  /* api request */
  const url = "proposal/findAcceptedProposalsForAcademiaIndusrty";
  const { data } = useAxios(url, "post", { id: profileID });

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
          data?.result?.map((item, index) => ({
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

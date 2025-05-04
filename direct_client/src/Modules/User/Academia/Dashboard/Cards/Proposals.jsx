import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { green, red, yellow } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { Typography } from "@mui/material";
const img = "/assets/img.jpeg";
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={img} sx={{ marginRight: 1 }}>
          {params.value[0]}
        </Avatar>
        {params.value}
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    width: 170,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      let bgColor;
      let Icon;
      if (params.value === "Reviewing") {
        bgColor = yellow[700];
        Icon = HourglassEmptyOutlinedIcon;
      }
      if (params.value === "Cancelled") {
        bgColor = red[500];
        Icon = CancelOutlinedIcon;
      }
      if (params.value === "Delivered") {
        bgColor = green[500];
        Icon = CheckCircleOutlineIcon;
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: bgColor,
            color: "#fff",
            padding: "3px 10px",
            borderRadius: "16px",
          }}
        >
          <Icon sx={{ fontSize: 13, marginRight: 1 }} />
          <Typography sx={{ fontSize: 12 }}>{params.value}</Typography>
        </Box>
      );
    },
  },
];

const rows = [
  { id: 1, name: "Fahad Ahmed ", date: "2024-05-15", status: "Delivered" },
  { id: 2, name: "Abdulllah", date: "2024-05-14", status: "Cancelled" },
  { id: 3, name: "Aman Ullah", date: "2024-05-13", status: "Reviewing" },
  { id: 4, name: "Muhammad", date: "2024-05-13", status: "Delivered" },
  { id: 5, name: "Naseer Malik", date: "2024-05-13", status: "Delivered" },
  { id: 6, name: "Aqib", date: "2024-05-13", status: "Delivered" },
];

export default function ProposalCard() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        hideFooter
      />
    </Box>
  );
}

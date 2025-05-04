import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

export const columnsFiles = [
  {
    field: "id",
    headerName: "No.",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "fileName",
    headerName: "Funding Agency/USER",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    renderCell: (param) => {
      return <p>{param.row?.email}</p>;
    },
  },

  {
    field: "type",
    headerName: "File Type",
    width: 250,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "size",
    headerName: "Size",
    width: 250,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Uploaded Date",
    width: 250,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "download",
    headerName: "Download",
    width: 300,

    align: "center",
    headerAlign: "center",
    renderCell: (param) => {
      return (
        <Button variant="contained" startIcon={<Download />}>
          <a
            href={param.row?.url}
            target="_blank"
            download
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Download
          </a>
        </Button>
      );
    },
  },
];

export const rowsFiles = [
  {
    id: 1,
    fileName: "User",
    size: "45KBs",
    upload: "Ali",
    type: "pdf",
    date: "Nov 18, 2023",
    url: "/pdf/Design & Development of a Smart Ball Based Surveil.pdf",
  },
];

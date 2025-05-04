import TypographyMUI from "../../../../MUI/TypographyMUI";
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
function data() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Project Names",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.title}
          placement="bottom-start"
          TransitionProps={{ timeout: 400 }}
          onClick={() => navigate("/directportal/dashboard/details")}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body2">
              {params.row.title}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },

    {
      field: "Initiator",
      headerName: "Initiator",
      width: 200,
    },
    {
      field: "applicationField",
      headerName: "Category",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,

      align: "start",
      headerAlign: "start",
    },
    {
      field: "proposalsAmount",
      headerName: "No. of Proposals",
      width: 250,

      align: "center",
      headerAlign: "center",
    },
    // {
    //   field: "StartDate",
    //   headerName: "Start Date of Proposal",
    //   width: 250,

    //   align: "center",
    //   headerAlign: "center",
    // },
    // {
    //   field: "EndDate",
    //   headerName: "End Date of Proposal",
    //   width: 250,

    //   align: "center",
    //   headerAlign: "center",
    // },

    // {
    //   field: "Proposals",
    //   headerName: "No. of Proposals",
    //   width: 150,

    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "ViewProposals",
      headerName: "View Proposals",
      width: 250,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Button
          onClick={() =>
            navigate(`/directportal/dashboard/proposallist/${params?.row?._id}`)
          }
          variant="contained"
          color="primary"
        >
          View
        </Button>
      ),
    },
  ];
  return { columns };
}

export default data;
const rows = [
  {
    id: 1,
    ProjectNames: "Smart Ball Based Surveillance System using AI (BKV-1)",
    Category: "Defence",
    Initiator: "Dr Amer Sohail Kashif",
    creationDateProject: "December 16, 2023",
    StartDate: "December 16, 2023",
    EndDate: "January 16, 2024",
    ProjectStatus: "ongoing",
    Proposals: "1",
    ViewProposals: 90785643,
    fundingAgency: "Defence",
  },
  {
    id: 2,
    ProjectNames: "Mechanical Mine Field Breaching System",
    Category: "Defence",
    Initiator: "Dr Kashif Ahmad",
    creationDateProject: "December 12, 2023",
    StartDate: "December 12, 2023",
    EndDate: "January 12, 2024",
    ProjectStatus: "ongoing",
    Proposals: "5",
    ViewProposals: 90785644,
    fundingAgency: "Defence",
  },
];

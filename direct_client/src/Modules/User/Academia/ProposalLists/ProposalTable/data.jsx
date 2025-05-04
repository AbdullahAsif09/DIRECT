import React from "react";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { Button, Chip, Stack } from "@mui/material";

function data() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 300,
      renderCell: (params) => (
        <TypographyMUI>
          {params?.row?.submittedBy?.id?.companyName}
        </TypographyMUI>
      ),
    },
    {
      field: "assignedTo",
      headerName: "Submission Date",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params?.row?.assignedTo[0]?.submissionDate);
        const formattedDate = `${date.getDate()} ${date.toLocaleString(
          "default",
          { month: "long" }
        )} ${date.getFullYear()}`;
        return <TypographyMUI>{formattedDate}</TypographyMUI>;
      },
    },
    {
      field: "reviewByReviewer",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.reviewByReviewer ? (
              <Chip color="success" label={"Review Submitted"} />
            ) : (
              <Chip color="error" label={"Action Required"} />
            )}
          </>
        );
      },
    },
    {
      field: "feedbackResearcher",
      headerName: "Feedback From Reviewer",
      width: 300,

      renderCell: (params) => (
        <Stack direction="row" alignItems={"center"} gap={1}>
          <TypographyMUI variant={"body2"}>Feedback not given</TypographyMUI>
        </Stack>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "viewBtn",
      headerName: "View/Rate Proposal",
      width: 200,

      renderCell: (params) => (
        <Button
          onClick={() => navigate(`/academia/rateproposal/${params.row?._id}`)}
          variant="contained"
        >
          View
        </Button>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  return { columns };
}

export default data;

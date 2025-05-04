import React from "react";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { Button, Chip, Stack } from "@mui/material";
import { useSelector } from "react-redux";

function data() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state?.profile?.profile);
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
      headerName: "Company Name",
      width: 300,
      renderCell: (params) => (
        <TypographyMUI>{params?.row?.submittedBy?.id?.name}</TypographyMUI>
      ),
    },
    {
      field: "assignedTo",
      headerName: "Submission Date",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params?.row?.assignedTo[0]?.submissionDate);
        const myDueDate = params?.row?.assignedTo?.find(
          (item) => item?.reviewerID?.id === profile?._id
        );
        // const formattedDate = `${myDueDate?.submissionDate?.getDate()} ${myDueDate?.submissionDate?.toLocaleString(
        //   "default",
        //   { month: "long" }
        // )} ${myDueDate?.submissionDate?.getFullYear()}`;
        return (
          <TypographyMUI>
            {new Date(myDueDate?.submissionDate).toDateString()}
          </TypographyMUI>
        );
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
    // {
    //   field: "feedbackResearcher",
    //   headerName: "Feedback From Reviewer",
    //   width: 300,

    //   renderCell: (params) => (
    //     <Stack direction="row" alignItems={"center"} gap={1}>
    //       <TypographyMUI variant={"body2"}>Feedback not given</TypographyMUI>
    //     </Stack>
    //   ),
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "viewBtn",
      headerName: "View/Rate Proposal",
      width: 200,

      renderCell: (params) => {
        let userType = location.pathname.split("/")[1];
        if (userType === "directportal") {
          userType = "directPortal/dashboard";
        }
        return (
          <Button
            onClick={() =>
              navigate(`/${userType}/reviewer/rateproposal/${params.row?._id}`)
            }
            variant="contained"
          >
            View
          </Button>
        );
      },
      align: "center",
      headerAlign: "center",
    },
  ];

  return { columns };
}

export default data;

import { Card, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import DataGrids from "@common/TableMui/DataGrids";
import React, { useEffect, useState } from "react";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useNavigate } from "react-router-dom";
import { customTheme } from "@theme/theme";
import { useAxios } from "@hooks";
import TypographyMUI from "@common/MUI/TypographyMUI";
function ProposalFeedBack({ proposalID, handleCloseModal }) {
  const { api } = useAxios();
  const navigate = useNavigate();
  const [ProposalStatus, setProposalStatus] = useState([]);
  const columnsFiles = [
    {
      field: "id",
      headerName: "No.",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reviewerName",
      headerName: "Reviewer",
      width: 400,
      renderCell: (param) => (
        <TypographyMUI variant={"body1"}>Abdullah Asif</TypographyMUI>
      ),
    },
    {
      field: "submissionDate",
      headerName: "Submission Date",
      width: 250,
      renderCell: (param) => new Date(param.row?.submissionDate).toDateString(),
    },
    {
      field: "reviewByReviewer",
      headerName: "Status",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <Chip
            label={
              param?.row?.reviewByReviewer
                ? "Review Submitted"
                : "Review Not Submitted"
            }
          />
        );
      },
    },
    {
      field: "view",
      headerName: "View Feedback",
      width: 300,

      align: "center",
      headerAlign: "center",
      renderCell: (param) => (
        <ButtonMui
          variant="contained"
          target="_blank"
          onClick={() =>
            navigate(
              `/directportal/dashboard/reviewfeedback/${param.row?.feedBackId}`
            )
          }
        >
          View FeedBack
        </ButtonMui>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const data = await api({
        method: "post",
        url: "admin/getAllFeedbackOfProject",
        object: { proposalId: proposalID },
      });
      console.log(data, "getAllFeedbackOfProject");
      if (data?.result?._id === proposalID) {
        const restructureData = data.result?.assignedTo.map((e, i) => ({
          id: i + 1,
          proposalID: data.result?._id,
          reviewByReviewer: data.result?.reviewByReviewer,
          submissionDate: e?.submissionDate,
          feedBackId: e?.feedBackId,
          reviewerName:
            e?.reviewerID?.id?.name ||
            e?.reviewerID?.id?.firstName + " " + e?.reviewerID?.id?.lastName,
        }));
        setProposalStatus(restructureData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container gap={2} sx={{ height: "100%", overflow: "auto" }}>
      <Grid item sx={{ mb: 3 }} xs={12}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant="h2">Feedback</Typography>
          </Stack>
          <IconButton onClick={handleCloseModal}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            m: 0.5,
            boxShadow: customTheme.palette.boxShadows.boxShadowCardsLight,
          }}
        >
          <DataGrids dataRow={ProposalStatus} dataColumn={columnsFiles} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProposalFeedBack;

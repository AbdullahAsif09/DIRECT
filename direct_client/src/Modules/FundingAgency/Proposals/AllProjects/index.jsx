import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Typography, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAxios } from "@hooks";
import { useNavigate, useParams } from "react-router-dom";
import ModalMui from "@common/ModalMui";
import UploadDocument from "./UploadDocument";
import { useSelector } from "react-redux";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        sx={{ flex: 1, textAlign: "start", padding: "5px", fontSize: "20px" }}
      >
        Proposals
      </Typography>
    </GridToolbarContainer>
  );
}

export default function AllProjects() {
  const { id: projectID } = useParams();
  const { data, loading, error } = useAxios(
    "user/getProposalsForAgency",
    "POST",
    { projectID }
  );
  const navigate = useNavigate();
  const [proposalData, setProposalData] = useState([]);
  const socket = useSelector((state) => state.socket.socket);
  const [ModalOpenAwarded, setModalOpenAwarded] = useState(null);
  const [ModalOpenContracted, setModalOpenContracted] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "No#",
      width: 70,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 300,
    },
    // {
    //   align: "center",
    //   headerAlign: "center",
    //   field: "feedbacks",
    //   headerName: "Feedbacks from Reviewer",
    //   width: 300,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#0DA678",
    //         color: "white",
    //         textTransform: "none",
    //       }}
    //       onClick={() => navigate(`/user/viewproposal/${params.row?._id}`)}
    //     >
    //       View
    //     </Button>
    //   ),
    // },
    {
      align: "center",
      headerAlign: "center",
      field: "view",
      headerName: "View Proposal",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0DA678",
            color: "white",
            textTransform: "none",
          }}
          onClick={() => navigate(`/user/viewproposal/${params.row?._id}`)}
        >
          View
        </Button>
      ),
    },
    {
      align: "center",
      headerAlign: "center",
      field: "awardedDocs",
      headerName: "Award Document",
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0DA678",
              color: "white",
              textTransform: "none",
            }}
            onClick={() => setModalOpenAwarded(params.row?._id)}
          >
            {params.value ? "Reupload Document" : "Upload Document"}
          </Button>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={ModalOpenAwarded === params.row?._id}
            handleCloseModalMui={() => setModalOpenAwarded(null)}
            content={
              <UploadDocument
                proposalID={params.row?._id}
                pastDocument={params.row?.awardedDocs}
                urlAwarded
              />
            }
          />
        </>
      ),
    },
    {
      align: "center",
      headerAlign: "center",
      field: "contractedDocs",
      headerName: "Contract Document",
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0DA678",
              color: "white",
              textTransform: "none",
            }}
            onClick={() => setModalOpenContracted(params.row?._id)}
          >
            {params.value ? "Reupload Document" : "Upload Document"}
          </Button>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={ModalOpenContracted === params.row?._id}
            handleCloseModalMui={() => setModalOpenContracted(null)}
            content={
              <UploadDocument
                proposalID={params.row?._id}
                pastDocument={params.row?.contractedDocs}
                urlContracted
              />
            }
          />
        </>
      ),
    },
    {
      align: "center",
      headerAlign: "center",
      field: "milestones",
      headerName: "Milestones",
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0DA678",
              color: "white",
              textTransform: "none",
            }}
            onClick={() =>
              navigate(
                `/fundingAgency/projectdetails/${projectID}?milestones=${params.row?.milestones}`
              )
            }
          >
            View Milestones
          </Button>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={ModalOpenContracted === params.row?._id}
            handleCloseModalMui={() => setModalOpenContracted(null)}
            content={
              <UploadDocument
                proposalID={params.row?._id}
                pastDocument={params.row?.contractedDocs}
                urlContracted
              />
            }
          />
        </>
      ),
    },
  ];
  const restructureData = () => {
    if (!data) return;
    const rowsData = data?.result?.map((e, i) => {
      const id = e?.submittedBy?.id;
      return {
        id: i + 1,
        companyName: id?.firstName + " " + id?.lastName,
        status: e.ongoing ? "In Progress" : "Completed",
        submissionDate: new Date(e?.createdAt).toDateString(),
        feedbacks: Boolean(e.reviewByReviewer) ? e.reviewByReviewer : null,
        contractedDocs: e?.contractedDocs,
        awardedDocs: e?.awardedDocs,
        milestones: e?.milestones,
        projectID: e?.projectID,
        _id: e._id,
      };
    });
    setProposalData(rowsData);
  };

  const handleNewProposalOfAgency = (newProposal) => {
    const id = newProposal?.submittedBy?.id;
    if (projectID === newProposal?.projectID) {
      setProposalData((prev) => [
        ...prev,
        {
          id: prev?.length + 1,
          companyName: id?.firstName + " " + id?.lastName,
          status: newProposal.ongoing ? "In Progress" : "Completed",
          submissionDate: new Date(newProposal?.createdAt).toDateString(),
          feedbacks: Boolean(newProposal.reviewByReviewer)
            ? newProposal.reviewByReviewer
            : null,
          contractedDocs: newProposal?.contractedDocs,
          awardedDocs: newProposal?.awardedDocs,
          milestones: e?.milestones,
          projectID: e?.projectID,
          _id: newProposal._id,
        },
      ]);
    }
  };

  useEffect(() => {
    restructureData();
    socket?.on("newProposalForFundingAgency", handleNewProposalOfAgency);
    return () => {
      socket?.off("newProposalForFundingAgency", handleNewProposalOfAgency);
    };
  }, [data]);
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#fff",
      }}
      marginTop={4}
    >
      <DataGrid
        sx={{ pl: 2 }}
        rows={loading ? [] : proposalData}
        loading={loading}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        rowSelection={false}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

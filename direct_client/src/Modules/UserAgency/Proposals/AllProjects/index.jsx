import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Typography, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalMui from "@common/ModalMui";
import UploadDocument from "./UploadDocument";
import { useSelector } from "react-redux";
import { useAxios } from "@hooks";

function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width={"100%"} textAlign={"right"}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

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
  const navigate = useNavigate();
  const { id: projectID } = useParams();
  const { data, loading } = useAxios("user/getProposalsForAgency", "POST", {
    projectID,
  });
  const [proposalData, setProposalData] = useState([]);
  const socket = useSelector((state) => state.socket.socket);
  const [ModalOpenContracted, setModalOpenContracted] = useState(false);
  const [ModalOpenAwarded, setModalOpenAwarded] = useState(false);
  const openModalContracted = () => setModalOpenContracted(true);
  const closeModalContracted = () => setModalOpenContracted(false);
  const openModalAwarded = () => setModalOpenAwarded(true);
  const closeModalAwarded = () => setModalOpenAwarded(false);
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
          onClick={() => {
            navigate(
              `/useragency/project/${params?.row?.projectID}/propsals/viewproposal/${params.row?._id}`
            );
          }}
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
            onClick={openModalAwarded}
          >
            {params.value ? "Reupload Document" : "Upload Document"}
          </Button>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={ModalOpenAwarded}
            handleCloseModalMui={closeModalAwarded}
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
            onClick={openModalContracted}
          >
            {params.value ? "Reupload Document" : "Upload Document"}
          </Button>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={ModalOpenContracted}
            handleCloseModalMui={closeModalContracted}
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
                `/useragency/projectdetails/${projectID}?milestones=${params.row?.milestones}`
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
    if (!socket) return;
    socket?.on("newProposalForUserAgency", handleNewProposalOfAgency);
    return () => {
      socket?.off("newProposalForUserAgency", handleNewProposalOfAgency);
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

import ButtonMui from "@common/MUI/ButtonMUI";
import ModalMui from "@common/ModalMui";
import { Send, ShareOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalResearcher from "./ModelResearcher";
import { keys } from "@config";
import ProposalFeedBack from "./ProposalFeedBack";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks";
function ProposalsData() {
  const dispatch = useDispatch();
  const { API } = useAxios();
  const navigate = useNavigate();
  const [openModalAssignReviewer, setOpenModalAssignReviewer] = useState(false);
  const [FundingAgency, setFundingAgency] = useState(false);
  const [CategoryReviewer, setCategoryReviewer] = useState("None");
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const handleOpenModalFeedback = () => setOpenModalFeedback(true);
  const handleCloseModalFeedback = () => setOpenModalFeedback(false);
  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModalAssignReviewer(true);
  };
  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpenModalAssignReviewer(false);
  };

  const { data } = useAxios(`reviewer/findAll?category=${CategoryReviewer}`);

  const SendProposalToAgency = async (proposalId) => {
    try {
      const res = await API({
        url: "proposal/sendToAgency",
        method: "patch",
        object: {
          proposalID: proposalId,
        },
      });
      if (res.message == "success") {
        dispatch(
          setAlert({ status: "success", text: "Proposal Send to Agency" })
        );
        setFundingAgency(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompleteProject = async (id) => {
    let dataToSend = {
      projectID: id,
    };
    try {
      const response = await API({
        url: "admin/completeProject",
        method: "patch",
        object: dataToSend,
      });
      if (response?.message === "success") {
        dispatch(setAlert({ status: "success", text: "Project is completed" }));
      }
      if (response?.message === "error") {
        dispatch(
          setAlert({ status: "error", text: "couldn't complete the project" })
        );
      }
    } catch (error) {
      dispatch(setAlert({ status: "error", text: "error?.message" }));
      console.log(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "submittedBy",
      headerName: "Industry / Researcher",
      width: 300,
      renderCell: (params) => (
        <TypographyMUI variant={"body1"}>
          {params.row?.submittedBy?.id?.name
            ? params.row?.submittedBy?.id?.name
            : "Abdullah"}
        </TypographyMUI>
      ),
    },
    {
      field: "createdAt",
      headerName: "Submission Date",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params?.row?.createdAt);
        return (
          <TypographyMUI variant={"body1"}>{date.toDateString()}</TypographyMUI>
        );
      },
    },
    {
      field: "researcherName",
      headerName: "Assigned to",
      width: 300,
      renderCell: (params) => (
        <>
          <ButtonMui
            onClick={handleOpenModal}
            variant="contained"
            endIcon={<ShareOutlined />}
          >
            Assign
          </ButtonMui>
          <ModalMui
            top={"45%"}
            left={"50%"}
            width={"60vw"}
            openModalMui={openModalAssignReviewer}
            handleCloseModalMui={handleCloseModal}
            content={
              <ModalResearcher
                proposalID={params.row?._id}
                reviewerData={data?.result ?? []}
                categoryFilter={CategoryReviewer}
                handleCloseModal={handleCloseModal}
                setCategoryFilter={setCategoryReviewer}
              />
            }
          />
        </>
      ),
    },
    {
      field: "viewBtn",
      headerName: "View Proposal",
      width: 250,

      renderCell: (params) => (
        <Button
          onClick={() =>
            navigate(`/directportal/dashboard/viewproposal/${params?.row?._id}`)
          }
          variant="contained"
        >
          View
        </Button>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reviewByReviewer",
      headerName: "Feedback From Reviewer",
      width: 300,

      renderCell: (params) =>
        params?.row?.reviewByReviewer ? (
          <Chip color="success" label={"Review Submitted"} />
        ) : (
          <Chip color="error" label={"Review not Submitted"} />
        ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "viewFeedback",
      headerName: "View Feedback",
      width: 200,

      renderCell: (params) =>
        params?.row?.reviewByReviewer ? (
          <>
            <Button onClick={handleOpenModalFeedback} variant="contained">
              View
            </Button>
            <ModalMui
              width={"70vw"}
              height={"60vh"}
              top={"50%"}
              left={"50%"}
              openModalMui={openModalFeedback}
              handleCloseModalMui={handleCloseModalFeedback}
              content={
                <ProposalFeedBack
                  proposalID={params?.row?._id}
                  handleCloseModal={handleCloseModalFeedback}
                />
              }
              noButtons
            />
          </>
        ) : (
          <TypographyMUI variant={"body1"}>No Feedback</TypographyMUI>
        ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sendToAgency",
      headerName: "Send Proposal to Funding Agency / User Agency / USER",
      width: 400,

      renderCell: (params) => (
        <>
          {params.value === false ||
          params.value === undefined ||
          params.value === null ? (
            <Button
              onClick={() => SendProposalToAgency(params.row?._id)}
              endIcon={<Send />}
              variant="contained"
            >
              Send
            </Button>
          ) : (
            <TypographyMUI
              variant={"body1"}
              fontWeight={500}
              color={"text.gray"}
            >
              Proposal Send!.
            </TypographyMUI>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Approved By Funding Agency / User Agency / USER",
      width: 400,
      renderCell: (param) => (
        <>
          {param?.row?.contractedDocs ? (
            <Chip color="success" clickable label={"Accepted"} />
          ) : null}
          {!param?.row?.awardedDocs && !param?.row?.contractedDocs ? (
            <Chip color="error" clickable label={"not accepted yet!"} />
          ) : null}
          {param?.row?.awardedDocs && !param?.row?.contractedDocs ? (
            <Chip color="warning" clickable label={"initially accepted"} />
          ) : null}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "awardedDocs",
      headerName: "Awareded Document",
      width: 400,
      renderCell: (param) => (
        <>
          {param?.value ? (
            <a target="_blank" href={`${keys.rootserver}/${param.value?.url}`}>
              <Button
                whileTap={{ scale: 0.9 }}
                variant="contained"
                href={`${keys.rootserver}/${param.value?.url}`}
                color="primary"
              >
                View
              </Button>
            </a>
          ) : (
            <TypographyMUI>Document isn't uploaded yet!</TypographyMUI>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "contractedDocs",
      headerName: "Contracted Document",
      width: 400,
      renderCell: (param) => (
        <>
          {param?.value ? (
            <a target="_blank" href={`${keys.rootserver}/${param.value?.url}`}>
              <Button
                whileTap={{ scale: 0.9 }}
                variant="contained"
                href={`${keys.rootserver}/${param.value?.url}`}
                color="primary"
              >
                View
              </Button>
            </a>
          ) : (
            <TypographyMUI>Document isn't uploaded yet!</TypographyMUI>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "completed",
      headerName: "Project Progress",
      width: 400,
      renderCell: (param) => (
        <>
          {param?.completed ? (
            <TypographyMUI>This Project is completed!</TypographyMUI>
          ) : (
            <Button
              whileTap={{ scale: 0.9 }}
              variant="contained"
              color="success"
              onClick={() => handleCompleteProject(param?.row?.projectID)}
            >
              Complete
            </Button>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  return columns;
}

export default ProposalsData;

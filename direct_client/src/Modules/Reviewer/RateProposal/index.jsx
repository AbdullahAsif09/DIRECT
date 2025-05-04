import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Description } from "@mui/icons-material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import ModalMui from "@common/ModalMui";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@common/Editor";
import DisplayDescription from "@common/DisplayDescription";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice.js";
import { TimelineUI, RatingMui } from "@common/UI";
import DisplayUploadedFiles from "@common/DisplayUploadedFiles/index.jsx";
import { useAxios } from "@hooks";
function RateProposal() {
  const { api } = useAxios();
  const { id: proposalID } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [proposaltext, setProposaltext] = useState([]);
  const [proposalMilestone, setProposalMilestone] = useState([]);
  const [proposalFiles, setProposalFiles] = useState([]);
  const [milestoneFeedback, setMilestoneFeedback] = useState(null);
  const [filesFeedback, setFilesFeedback] = useState(null);
  const profile = useSelector((state) => state?.profile?.profile);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // to handle fetching of data of proposal
  const fetchFormData = async () => {
    // dispatch(setLoading(true));
    try {
      const data = await api({
        url: "proposal/getProposalForFeedback",
        method: "post",
        object: { id: proposalID },
      });

      if (data?.message === "success") {
        const responseData = data.result;
        setProposaltext(responseData?.proposalText);
        setProposalMilestone(responseData?.proposalMilestones);
        if (responseData?.proposalfile) {
          setProposalFiles(responseData?.proposalfile);
        }
        // dispatch(setLoading(false));
      }
    } catch (error) {
      // dispatch(setLoading(false));
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFormData();
  }, []);

  // handle milestoneFeedback
  const handleMilestoneFeedback = (event, editor) => {
    const data = editor.getData();
    setMilestoneFeedback(data);
  };
  // handle filesFeedback
  const handleFilesFeedback = (event, editor) => {
    const data = editor.getData();
    setFilesFeedback(data);
  };
  // to handle text of a feedback
  const handleChangeProposalText = debounce((event, editor, name) => {
    const data = editor.getData();
    setProposaltext((prevState) => {
      return prevState.map((e) => {
        if (e?.heading === name) {
          return {
            ...e,
            feedback: data,
          };
        }
        return e;
      });
    });
  }, 500);

  // to create feedback
  const handleCreateFeedback = async (id) => {
    const dataToSend = {
      feedbackDetails: id,
      feedbackBy: profile?._id,
      proposalID: proposalID,
      inDraft: true,
    };
    return dataToSend;
    try {
      const data = await api({
        url: "feedback/createFeedback",
        method: "post",
        object: dataToSend,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // to handle submit feedback
  const handleSubmitFeedback = async () => {
    if (proposaltext.length === 0) return;
    if (proposaltext.length === 0) return;
    const stringifiedData = JSON.stringify(proposaltext);
    try {
      const data = await api({
        url: "feedback/submitFeedbackDetails",
        method: "POST",
        object: {
          proposalText: stringifiedData,
          feedbackBy: profile?._id,
        },
      });
      if (data?.result) {
        handleCreateFeedback(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to handle rating as a feedback
  const handleRating = (event, name) => {
    setProposaltext((prevState) => {
      return prevState.map((e) => {
        if (e?.heading === name) {
          return {
            ...e,
            rating: event,
          };
        }
        return e;
      });
    });
  };

  return (
    <form>
      <Grid container sx={{ pt: 6, pb: 2, pl: 2, pr: 2 }} gap={4}>
        <Grid item xs={12}>
          <MainHeadings text={"View/Rate Proposal"} />
        </Grid>

        {proposaltext?.length > 0 &&
          proposaltext?.map((e, i) => (
            <Grid key={i} item xs={12}>
              <DisplayDescription
                editorValue={e?.feedback}
                rating={true}
                editor
                onChange={(event, editor) => {
                  handleChangeProposalText(event, editor, e?.heading);
                }}
                ratingValue={(event, newValue) =>
                  handleRating(newValue, e?.heading)
                }
                feedback={e?.feedback}
                htmlContent={e?.content}
                IconsHeadingsIcon={<Description sx={{ color: "#252B42" }} />}
                IconsHeadingsText={e?.heading}
              />
            </Grid>
          ))}
        {proposalMilestone.length > 0 && (
          <Grid item xs={12}>
            <TimelineUI
              milestoneData={proposalMilestone}
              ratingAdd
              editor={handleMilestoneFeedback}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <DisplayUploadedFiles
            dataToShow={proposalFiles}
            remarks={handleFilesFeedback}
            ratingAdd
          />
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={1}
          item
          xs={12}
        >
          <Button
            color="error"
            onClick={(e) => window.history.back()}
            variant="contained"
          >
            Back
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmitFeedback();
            }}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
        {openModal && (
          <ModalMui
            top={"50%"}
            left={"50%"}
            height={"60vh"}
            width={"60vw"}
            openModalMui={openModal}
            handleCloseModalMui={handleCloseModal}
            content={
              <ModalContent
                proposaltext={proposaltext}
                filesFeedback={filesFeedback}
                proposalMilestone={proposalMilestone}
                milestoneFeedback={milestoneFeedback}
                handleCloseModal={handleCloseModal}
              />
            }
          />
        )}
      </Grid>
    </form>
  );
}

export default RateProposal;

const ModalContent = ({
  proposaltext,
  filesFeedback,
  handleCloseModal,
  milestoneFeedback,
  proposalMilestone,
}) => {
  const { api } = useAxios();
  const dispatch = useDispatch();
  const { id: proposalID } = useParams();
  const profile = useSelector((state) => state?.profile?.profile);
  const [Ratings, setRatings] = useState(0);
  const [Summery, setSummery] = useState(null);
  // to handle summery change
  const handleChangeSummery = (event, editor) => {
    const data = editor.getData();
    setSummery(data);
  };

  // to create feedback
  const handleCreateFeedback = async (feedbackDetailID) => {
    if (!Ratings || !Summery) return;
    try {
      const data = await api({
        url: "feedback/createFeedback",
        method: "POST",
        object: {
          feedbackDetails: feedbackDetailID,
          feedbackBy: profile?._id,
          proposalID: proposalID,
          summary: Summery,
          rating: Ratings,
          inDraft: false,
          feedbackSentTo: "admin",
        },
      });

      if (data?.message === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: `Feedback has been submitted!`,
          })
        );
        handleCloseModal();
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to submit feedback details
  const submitFeedbackDetails = async (event) => {
    try {
      const stringifiedData = JSON.stringify(proposaltext);
      const stringifiedDataFiles = JSON.stringify(filesFeedback);
      const stringifiedDataMilestone = JSON.stringify(milestoneFeedback);
      const stringifiedProposalMilestone = JSON.stringify(proposalMilestone);

      const data = await api({
        url: "feedback/submitFeedbackDetails",
        method: "POST",
        object: {
          feedbackText: stringifiedData,
          feedbackFiles: stringifiedDataFiles,
          feedbackMilestone: {
            milestone: stringifiedProposalMilestone,
            milestoneFeedback: stringifiedDataMilestone,
          },
          feedbackBy: profile?._id,
        },
      });
      if (data?.result) {
        handleCreateFeedback(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <Grid
        sx={{ overflow: "auto", height: "100%", pt: 1, pl: 1, pr: 1 }}
        container
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={2}
      >
        <Grid item sx={{ mb: 1 }} xs={12}>
          <Typography textAlign={"center"} variant="h2">
            Proposal Feedback
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
        <Grid item sx={{ mb: 1 }} xs={12}>
          <Typography variant="body1" fontWeight={600}>
            Rating
          </Typography>
        </Grid>
        <Grid sx={{ mt: -2, mb: 2 }} item xs={12}>
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            <RatingMui setValue={(event, newValue) => setRatings(newValue)} />
            <Typography fontWeight={600} color={"text.grey"} variant="body2">
              {`( ${Ratings} )`}
            </Typography>
          </Stack>
        </Grid>
        <Grid item sx={{ mb: 0 }} xs={12}>
          <Typography variant="body1" fontWeight={600}>
            Summery
          </Typography>
        </Grid>
        <Grid sx={{ mt: -2, mb: 2 }} item xs={12}>
          <Editor onChange={handleChangeSummery} />
        </Grid>
        <Grid item sx={{ mt: 2 }} xs={12}>
          <Stack
            gap={1}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              component={motion.div}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "bg.slightlyLightRed",
                "&:hover": {
                  backgroundColor: "bg.normalRed",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              component={motion.div}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                submitFeedbackDetails();
                // navigate(`/academia/proposallists`);
              }}
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

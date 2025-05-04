import { Divider, Grid, Stack, useMediaQuery } from "@mui/material";
import TabFeedbackModal from "./TabFeedbackModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksProject } from "@utils/ProjectsData";
import TypographyMUI from "../MUI/TypographyMUI";
import BackButtons from "../UI/ButtonsUI/BackButtons";
import { useAxios, useGetQueryParam } from "@hooks";
import MainHeadings from "../AnimationMui/MainHeadings";
import ButtonMui from "../MUI/ButtonMUI";
import { keys } from "@config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import ModalMui from "../ModalMui";
import InputFields from "../InputFields/InputFields";

function CompareMilestone() {
  const { id: milestoneID } = useParams();
  const [dataProject, setDataProject] = useState(null);
  const [milestoneData, setMilestoneData] = useState(null);
  const [newMilestoneData, setNewMilestoneData] = useState(null);
  const milestoneIndex = useGetQueryParam("no");
  const matches = useMediaQuery("(max-width:1200px)");
  const {
    data: dataMilestones,
    loading: loadingMilestones,
    error: errorMilestones,
  } = useAxios(`milestone/getMilestone`, "post", { id: milestoneID });
  const ExtractData = () => {
    let FilteredData = TasksProject.filter((e) => e.id == 1);
    if (FilteredData.length !== 0) {
      setDataProject(FilteredData[0]);
    }
  };
  const reStructureData = async () => {
    const restructureData = dataMilestones?.result?.details?.filter(
      (e, i) => milestoneIndex == i
    );
    if (!restructureData) {
      return;
    }
    setMilestoneData(restructureData[0]);
    if (dataMilestones?.result?.newDetails.length > 0) {
      const restructureNewData = dataMilestones?.result?.newDetails?.filter(
        (e, i) => e?.milestoneIndex == milestoneIndex && e?.inReview == true
      );
      setNewMilestoneData(restructureNewData[0]);
    }
  };
  useEffect(() => {
    reStructureData();
    ExtractData();
  }, [dataMilestones]);
  if (!dataProject) {
    return;
  }
  return (
    <Grid container sx={{ mb: 4 }} rowGap={5}>
      <Grid
        item
        xs={12}
        sx={{ height: "100%", overflow: "auto", marginTop: 6, marginBottom: 6 }}
      >
        <BackButtons
          onClick={() => window.history.back()}
          sx={{ m: 2, color: "grey", cursor: "pointer" }}
          variant="body1"
        >
          Back
        </BackButtons>
      </Grid>
      <Grid item md={12} lg={newMilestoneData ? 5.5 : 12}>
        <ViewMilestone
          mainHeading={
            newMilestoneData
              ? "Current Version"
              : `Milestone ${parseInt(milestoneIndex) + 1}`
          }
          milestoneData={milestoneData}
          milestoneIndex={milestoneIndex}
        />
      </Grid>
      <Grid
        item
        lg={1}
        md={12}
        display={newMilestoneData ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Divider
          orientation={matches ? "vertical" : "horizontal"}
          flexItem
          sx={{ border: "1px solid black" }}
        />
      </Grid>
      {newMilestoneData && (
        <Grid item md={12} lg={5.5}>
          <ViewMilestone
            mainHeading={"Updated Version"}
            setNewMilestoneData={setNewMilestoneData}
            setMilestoneData={setMilestoneData}
            milestoneData={newMilestoneData}
            milestoneIndex={milestoneIndex}
            milestoneID={milestoneID}
          />
        </Grid>
      )}
    </Grid>
  );
}
export default CompareMilestone;

function ViewMilestone({
  milestoneData,
  milestoneIndex,
  mainHeading,
  setMilestoneData,
  setNewMilestoneData,
  milestoneID,
}) {
  const { api } = useAxios();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleAcceptChanges = async () => {
    try {
      const data = await api({
        url: "milestone/acceptChangesInSingleMilestone",
        method: "post",
        object: {
          newDetailsIndex: milestoneData?.milestoneIndex,
          milestoneIndex,
          milestoneID,
        },
      });
      if (data?.result) {
        setNewMilestoneData(null);
        setMilestoneData(milestoneData);
        dispatch(setAlert({ text: "Changes Accepted", status: "success" }));
      }
    } catch (error) {
      dispatch(setAlert({ text: "Changes aren't Accepted", status: "error" }));
      console.log(error, "error");
    }
  };

  return (
    <>
      {milestoneData ? (
        <Grid container gap={2}>
          <Grid item sx={{ mb: 0 }} xs={12}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <MainHeadings sx={{ m: 2 }} variant="h1" text={mainHeading} />
            </Stack>
          </Grid>
          <Grid item sx={{ mb: 0 }} xs={12}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <TypographyMUI sx={{ m: 2 }} variant="h2">
                {milestoneData?.title}
              </TypographyMUI>
            </Stack>
          </Grid>
          <TabFeedbackModal dataCard={milestoneData} />
          {mainHeading === "Updated Version" && (
            <Grid item xs={12} display={"flex"} gap={1}>
              <ButtonMui
                sx={{
                  backgroundColor: (theme) => theme.palette.bg.darkBlue,
                }}
                onClick={handleAcceptChanges}
                variant={"contained"}
              >
                Accept Changes
              </ButtonMui>
              <ButtonMui
                onClick={handleOpenModal}
                color={"error"}
                variant={"contained"}
              >
                Reject Changes
              </ButtonMui>
              <ModalMui
                top={"45%"}
                left={"50%"}
                width={"60vw"}
                openModalMui={openModal}
                handleCloseModalMui={handleCloseModal}
                content={
                  <ModalContent
                    newDetailsIndex={milestoneData?.milestoneIndex}
                    setNewMilestoneData={setNewMilestoneData}
                    handleCloseModal={handleCloseModal}
                    milestoneID={milestoneID}
                  />
                }
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <TypographyMUI sx={{ m: 2 }} variant="h2">
          No Data Found
        </TypographyMUI>
      )}
    </>
  );
}

function ModalContent({
  id,
  handleCloseModal,
  setNewMilestoneData,
  newDetailsIndex,
  milestoneID,
}) {
  const dispatch = useDispatch();
  const { api } = useAxios();
  const [Form, setForm] = useState("");
  const handleSubmit = async () => {
    if (!Form) {
      return dispatch(
        setAlert({ text: "Please fill the form", status: "error" })
      );
    }
    try {
      const response = await api({
        url: "milestone/rejectChangesInSingleMilestone",
        method: "post",
        object: {
          newDetailsIndex: newDetailsIndex,
          milestoneID: milestoneID,
          rejectionReason: Form,
        },
      });
      if (response?.status === 200) {
        setNewMilestoneData(null);
        setForm("");
        dispatch(
          setAlert({ text: "Form submitted successfully", status: "success" })
        );
        handleCloseModal();
      }
    } catch (error) {
      dispatch(setAlert({ text: "internal error", status: "error" }));
      console.log(error);
    }
  };
  return (
    <Grid sx={{ overflow: "auto", height: "100%" }} container gap={2}>
      <Grid item xs={12}>
        <MainHeadings sx={{ m: 2 }} variant="h2" text={"Reason:"} />
      </Grid>
      <Grid item xs={12}>
        <TypographyMUI variant={"body1"}>
          Explain the rationale behind the rejection of the proposed changes.
        </TypographyMUI>
      </Grid>
      <Grid item xs={12}>
        <InputFields
          variant="outlined"
          type={"textbox"}
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setForm(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={2}>
          <ButtonMui
            variant={"contained"}
            sx={{ background: (theme) => theme.palette.bg.secondDarkBlue }}
            onClick={handleSubmit}
          >
            Submit
          </ButtonMui>
          <ButtonMui variant={"contained"} color={"error"}>
            Cancel
          </ButtonMui>
        </Stack>
      </Grid>
    </Grid>
  );
}

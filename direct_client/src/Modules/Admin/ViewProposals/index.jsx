import { ButtonGroup, Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import DisplayUploadedFiles from "@common/DisplayUploadedFiles";
import { useParams } from "react-router-dom";
import { BackArrowButtonComp } from "@common/MUI";
import ProposalTextCard from "./ProposalTextCard";
import { TimelineUI } from "@common/UI";
import { useAxios } from "@hooks";
import Remarks from "./Remarks";
import ButtonMui from "@common/MUI/ButtonMUI";
import ModalMui from "@common/ModalMui";
import { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
function ViewProposals() {
  const { id: ParamsId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [viewOlderVersion, setViewOlderVersion] = useState(false);
  const { data } = useAxios("proposal/getProposal", "POST", { id: ParamsId });
  const handleOpenModalFeedback = () => setOpenModal(true);
  const handleCloseModalFeedback = () => setOpenModal(false);
  const proposalDetails = data?.result;
  console.log(proposalDetails, "proposalDetails");
  return (
    <Grid container sx={{ pt: 6, pb: 2, pl: 2, pr: 2 }} gap={4}>
      <Grid item xs={12}>
        <BackArrowButtonComp
          marginBottom={"10px"}
          marginTop={"10px"}
          route={`/directportal/dashboard/proposallist/${proposalDetails?.projectID}`}
        />
      </Grid>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <MainHeadings text={"View Proposal"} />
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <ButtonMui variant={"contained"} onClick={handleOpenModalFeedback}>
            Requested Changes
          </ButtonMui>
          <ButtonMui
            disabled={
              proposalDetails?.oldProposalText &&
              proposalDetails?.oldProposalfile
                ? false
                : true
            }
            variant={"contained"}
            onClick={() => setViewOlderVersion(!viewOlderVersion)}
          >
            {viewOlderVersion === false
              ? "View Older Version"
              : "View Newer Version"}
          </ButtonMui>
        </ButtonGroup>
      </Grid>
      {proposalDetails &&
        proposalDetails?.proposalText &&
        Object.entries(
          viewOlderVersion
            ? proposalDetails?.oldProposalText
            : proposalDetails?.proposalText
        )?.map(([e, i], key) => (
          <Grid item xs={12} key={key}>
            <ProposalTextCard title={e} description={i} />
          </Grid>
        ))}
      <Grid item xs={12}>
        <TimelineUI milestoneData={proposalDetails?.milestones?.details} />
      </Grid>
      <Grid item xs={12}>
        <DisplayUploadedFiles
          dataToShow={
            viewOlderVersion
              ? proposalDetails?.oldProposalfile
              : proposalDetails?.proposalfile
          }
        />
      </Grid>
      <ModalMui
        top={"45%"}
        left={"50%"}
        width={"70vw"}
        content={<Remarks />}
        openModalMui={openModal}
        handleCloseModalMui={handleCloseModalFeedback}
      />
    </Grid>
  );
}

export default ViewProposals;

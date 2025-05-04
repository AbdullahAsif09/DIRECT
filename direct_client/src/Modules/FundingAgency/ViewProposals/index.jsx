import { Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import DisplayUploadedFiles from "@common/DisplayUploadedFiles";
import { useParams } from "react-router-dom";
import ProposalTextCard from "./ProposalTextCard";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI";
function ViewProposals() {
  const { id: ParamsId } = useParams();
  const { data, loading } = useAxios("/proposal/getProposal", "POST", {
    id: ParamsId,
  });
  const proposalDetails = data?.result;

  return (
    <Grid container sx={{ pt: 6, pb: 2, pl: 2, pr: 2 }} gap={4}>
      <Spinner isLoading={loading} />
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <MainHeadings text={"Proposal-Cloud Migration"} />
      </Grid>
      {proposalDetails &&
        proposalDetails?.proposalText &&
        Object.entries(proposalDetails?.proposalText)?.map(([e, i], key) => (
          <Grid item xs={12} key={key}>
            <ProposalTextCard title={e} description={i} />
          </Grid>
        ))}

      <Grid item xs={12}>
        <DisplayUploadedFiles dataToShow={proposalDetails?.proposalfile} />
      </Grid>
    </Grid>
  );
}

export default ViewProposals;

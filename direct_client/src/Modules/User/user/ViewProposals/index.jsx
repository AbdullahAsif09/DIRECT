import { Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import DisplayUploadedFiles from "@common/DisplayUploadedFiles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackArrowButtonComp } from "@common/MUI";
import ProposalTextCard from "./ProposalTextCard";
import { TimelineUI } from "@common/UI";
import { useAxios } from "@hooks";
function ViewProposals() {
  const { API } = useAxios();
  const { id: ParamsId } = useParams();
  const [proposalDetails, setProposalDetails] = useState(null);

  const fetchData = async () => {
    // dispatch(setLoading(true));
    try {
      const response = await API({
        url: `proposal/getProposal/`,
        method: "POST",
        object: {
          id: ParamsId,
        },
      });
      if (response?.result) {
        setProposalDetails(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const FinancialProposalsArray = [
    {
      label: "HR Costs",
      value: "234,000",
    },

    {
      label: "Materials",
      value: "234,500",
    },
    {
      label: "Infrastructure",
      value: "523,000",
    },
    {
      label: "Estimated Tax",
      value: "400,500",
    },
    {
      label: "Total Budget",
      value: "1,000,000",
    },
  ];
  return (
    <Grid container sx={{ pt: 6, pb: 2, pl: 2, pr: 2 }} gap={4}>
      <Grid item xs={12}>
        <BackArrowButtonComp
          marginBottom={"10px"}
          marginTop={"10px"}
          route={`/user/project/${proposalDetails?.projectID}/propsals`}
        />
      </Grid>
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
        <TimelineUI milestoneData={proposalDetails?.milestones?.details} />
      </Grid>
      <Grid item xs={12}>
        <DisplayUploadedFiles dataToShow={proposalDetails?.proposalfile} />
      </Grid>
    </Grid>
  );
}

export default ViewProposals;

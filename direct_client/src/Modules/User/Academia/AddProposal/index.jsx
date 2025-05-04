import AddForm from "./AddForm";
import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonsUI from "@common/UI/SkeletonsUI";
import { useSelector } from "react-redux";
import { useAxios } from "@hooks";

function AddProposal() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.profile);
  const { id: projectID } = useParams();
  const { data } = useAxios(`proposal/getProposalValues?id=${projectID}`);

  return (
    <Grid
      container
      sx={{ pt: 8, minHeight: "90vh", overflow: "hidden" }}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      gap={4}
    >
      <Grid sx={{ height: "100%" }} item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <MainHeadings text={"Send Proposal"} />
          <Button
            onClick={() => navigate("/academia/projectdetails/" + projectID)}
            variant="contained"
            color="success"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {data?.result ? (
          <AddForm
            appliedBy={"academia"}
            profileId={profile?._id}
            FormDataProp={data?.result}
            projectID={projectID}
          />
        ) : (
          <Stack direction={"column"} gap={1}>
            <SkeletonsUI />
            <SkeletonsUI />
            <SkeletonsUI />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

export default AddProposal;

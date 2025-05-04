import AddForm from "./AddForm";
import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useNavigate, useParams } from "react-router-dom";
import { SkeletonsUI } from "@common/UI";
import { useSelector } from "react-redux";
import { useAxios, useGetRole } from "@hooks";

function AddProposal() {
  const navigate = useNavigate();
  const role = useGetRole();
  const profile = useSelector((state) => state.profile.profile);
  const { id } = useParams();
  const { data } = useAxios(`proposal/getProposalValues?id=${id}`);
  const FormData = data?.result;
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
            onClick={() => navigate(-1)}
            variant="contained"
            color="success"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {FormData ? (
          <AddForm
            appliedBy={role}
            profileId={
              role == "industry"
                ? profile?.industry?._id
                : profile?.academia?._id
            }
            FormDataProp={FormData}
            projectID={id}
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

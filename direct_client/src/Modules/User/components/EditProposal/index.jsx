import AddForm from "./AddForm";
import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useNavigate, useParams } from "react-router-dom";
import { SkeletonsUI, TabsCommon } from "@common/UI";
import { useSelector } from "react-redux";
import { useAxios, useGetRole } from "@hooks";
import { useGetQueryParam } from "@hooks/useGetQueryParms";
import UpdateForms from "./UpdateForms";
import { useState } from "react";
import TypographyMUI from "@common/MUI/TypographyMUI";

function EditProposal() {
  const navigate = useNavigate();
  const role = useGetRole();
  const { id } = useParams();
  const [Tabs, setTabs] = useState(0);
  const proposalID = useGetQueryParam("proposal");
  const profile = useSelector((state) => state.profile.profile);
  const arrayTabs = ["Proposal", "Recommended Changes"];
  const { data: dataProposal } = useAxios(
    `proposal/getProposal?id=${id}`,
    "post",
    { id: proposalID }
  );
  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };
  console.log(dataProposal, "dataProposal");
  return (
    <Grid
      container
      sx={{ pt: 8, overflow: "hidden" }}
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
          <MainHeadings text={"Edit Proposal"} />
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
        <TabsCommon
          arrayTabs={arrayTabs}
          handleChange={handleChangeTabs}
          value={Tabs}
        />
      </Grid>
      {Tabs === 0 && (
        <Grid item xs={12}>
          {dataProposal?.result ? (
            <UpdateForms
              appliedBy={role}
              proposalID={proposalID}
              proposalData={dataProposal?.result}
              profileId={
                role == "industry"
                  ? profile?.industry?._id
                  : profile?.academia?._id
              }
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
      )}
      {Tabs === 1 && (
        <Grid item xs={12}>
          <TypographyMUI variant={"body1"}>
            {dataProposal?.result?.reqChangesRemarks
              ? dataProposal?.result?.reqChangesRemarks
              : "No Changes Recommended"}
          </TypographyMUI>
        </Grid>
      )}
    </Grid>
  );
}

export default EditProposal;

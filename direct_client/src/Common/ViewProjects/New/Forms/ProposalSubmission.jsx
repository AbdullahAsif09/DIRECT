import { Grid } from "@mui/material";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import ProposalValues from "./ProposalValues";
import { DriveFolderUpload, TextSnippet } from "@mui/icons-material";
import { CreateProjectContext } from "../CreateContext";
import { useContext } from "react";

function ProposalSubmission() {
  const { values, handleChange, setFieldValue } =
    useContext(CreateProjectContext);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} gap={3}>
      <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        xs={12}
        sx={{ mt: 2, mb: 2 }}
      >
        <TypographyGrow
          variant={"h1"}
          width={"70%"}
          lineHeight={1.4}
          text={
            "Project Technical/ Financial Oblige Proposal Fields ( to be followed by Researcher, SME, Industry )"
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <ProposalValues
          values={values.proposalText}
          section={"proposalText"}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          heading={"Proposal Text's Fields"}
          icons={<TextSnippet sx={{ color: "#252B42" }} />}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <ProposalValues
          icons={<DriveFolderUpload sx={{ color: "#252B42" }} />}
          section={"proposalfile"}
          setFieldValue={setFieldValue}
          heading={"Fields for Proposal Documents"}
          handleChange={handleChange}
          values={values.proposalfile}
        />
      </Grid>
    </Grid>
  );
}

export default ProposalSubmission;

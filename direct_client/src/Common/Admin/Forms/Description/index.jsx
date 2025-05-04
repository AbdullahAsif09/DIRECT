import { Grid } from "@mui/material";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import Editor from "../../../Editor";
import { useContext } from "react";
import { PublishContext } from "../../../../Modules/Admin/PublishReq/PublishContext";

function Description() {
  const { values, setFieldValue } = useContext(PublishContext);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={4}
      columnGap={2}
    >
      <Grid item xs={12}>
        <TypographyGrow variant={"h2"} text={"Background"} />
      </Grid>

      <Grid item xs={12}>
        <Editor
          value={values?.description}
          tooltipText={`Briefly explain what the project seeks to achieve and its overall boundaries`}
          label={"Detail Description"}
          name={`description`}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Editor
          tooltipText={`Briefly describe the research methods used (e.g., simulations, surveys, field tests, end product etc.)`}
          label={"Methodology"}
          name={`methodology`}
          value={values?.methodology}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Editor
          tooltipText={`Enter the letter or reference number, meeting, or visit that resulted in the project proposal.`}
          value={values?.references}
          label={"References"}
          name={`references`}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}

export default Description;

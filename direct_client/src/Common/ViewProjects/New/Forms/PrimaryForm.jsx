import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import Editor from "../../../Editor";
import { CreateProjectContext } from "../CreateContext";

function PrimaryForm() {
  const { setFieldValue, values } = useContext(CreateProjectContext);
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        rowGap={4}
        columnGap={2}
      >
        <Grid item xs={12}>
          <TypographyGrow variant={"h1"} text={"Background"} />
        </Grid>

        <Grid item xs={12}>
          <Editor
            tooltipText={`Briefly explain what the project seeks to achieve and its overall boundaries`}
            label={"Detail Description"}
            name={`description`}
            value={values?.description}
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
            label={"References"}
            name={`references`}
            value={values?.references}
            setFieldValue={setFieldValue}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PrimaryForm;

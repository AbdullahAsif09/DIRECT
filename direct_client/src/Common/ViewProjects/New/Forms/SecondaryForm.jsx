import React from "react";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import { Grid } from "@mui/material";
import InputFields from "../../../InputFields/InputFields";

function SecondaryForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) {
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
          <TypographyGrow variant={"h1"} text={"Technical Information"} />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Project Status"}
            placeholder={"Your Project Status"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Research"}
            placeholder={"Research"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Application Field"}
            placeholder={"Your Application Field"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Overhead Amount"}
            placeholder={"Overhead Amount"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Duration"}
            placeholder={"Your Project's Duration"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Nust Share"}
            placeholder={"Nust Share in Project"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Funding Agency"}
            placeholder={"Write Funding Agency Name"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Funding From Agency"}
            placeholder={"Write Funding From Agency"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Other ORG Share"}
            placeholder={"Write share of other organization"}
          />
        </Grid>
        <Grid item xs={5.6}>
          <InputFields
            type={"text"}
            label={"Initiator Details"}
            placeholder={"Write initiator name"}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default SecondaryForm;

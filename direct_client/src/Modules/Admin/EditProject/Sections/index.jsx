import { Button, Grid, styled } from "@mui/material";
import React from "react";
import TypographyGrow from "@common/AnimationMui/TypographyGrow";
import InputFields from "@common/InputFields/InputFields";
import { CloudUpload } from "@mui/icons-material";
import Editor from "@common/Editor";
const GridUpload = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
}));
const TextUpload = styled("span")(({ theme }) => ({
  color: "#484848",
  fontSize: ".8rem",
  fontWeight: "400",
  lineHeight: "166.5%",
}));
const ButtonUpload = styled(Button)(({ theme }) => ({
  color: "black",
  fontSize: ".8rem",
  border: "1px solid #D7D7D7",
  background: "linear-gradient(180deg, #FFF 0%, #929292 100%)",
  "&:hover": {
    color: "black",
    border: "1px solid #D7D7D7",
    background: "linear-gradient(180deg, #FFF 0%, #929292 100%)",
  },
}));
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
function Sections() {
  return (
    <Grid container justifyContent={"space-between"} rowGap={2}>
      <Grid item xs={12}>
        <TypographyGrow
          align={"left"}
          variant={"h2"}
          text={"Breif Introduction"}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          required
          type={"text"}
          label={"Project Title"}
          placeholder={"Your Project Title"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
          //   value={values?.title}
          //   error={!!touched.title && !!errors.title}
          //   helperText={touched.title && errors.title}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          type={"text"}
          label={"Funding Agency"}
          placeholder={"Write Funding Agency Name"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Funding Scheme"}
          placeholder={"Write About Funding Scheme"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Initiator Details"}
          placeholder={"Write About Initiator Details"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Application Field"}
          placeholder={"Write About Application Field"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Research"}
          placeholder={"Write About Research"}
          name={"title"}
          //   onBlur={handleBlur}
          //   onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Editor label={"Objectives"} />
      </Grid>
      <Grid item xs={12}>
        <Editor label={"Deliverables"} />
      </Grid>
      <GridUpload item xs={12}>
        <ButtonUpload
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          href="#file-upload"
        >
          Upload a picture
          <VisuallyHiddenInput
            name={"image"}
            // onChange={(e) => setFieldValue(e.target.files[0])}
            // value={values?.image}
            type="file"
          />
        </ButtonUpload>
        <TextUpload>Attach a Project Picture</TextUpload>
      </GridUpload>
    </Grid>
  );
}

export default Sections;

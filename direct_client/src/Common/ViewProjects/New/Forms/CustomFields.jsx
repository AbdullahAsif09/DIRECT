import { Grid } from "@mui/material";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import FileUploadCompAdmin from "../../../FileUploadCompAdmin";
import { useContext } from "react";
import { CreateProjectContext } from "../CreateContext";

function CustomFields() {
  const { values, handleChange, setFieldValue } =
    useContext(CreateProjectContext);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} gap={3}>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <TypographyGrow variant={"h1"} text={"Customizable Fields"} />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <FileUploadCompAdmin
          values={values.uploadFiles}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}

export default CustomFields;

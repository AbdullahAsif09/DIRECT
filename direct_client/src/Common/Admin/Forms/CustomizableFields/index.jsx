import { Grid } from "@mui/material";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import FileUploadCompAdmin from "../../../FileUploadCompAdmin";
import { useContext } from "react";
import { PublishContext } from "../../../../Modules/Admin/PublishReq/PublishContext";
// (values = [
//   { name: "Budget" },
//   { name: "Work Plans" },
//   { name: "Timelines" },
//   { name: "Gantt Chart" },
// ]),
function CustomizableFields() {
  const { setFieldValue, values, handleChange } = useContext(PublishContext);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} gap={3}>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <TypographyGrow variant={"h2"} text={"Customizable Fields"} />
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

export default CustomizableFields;

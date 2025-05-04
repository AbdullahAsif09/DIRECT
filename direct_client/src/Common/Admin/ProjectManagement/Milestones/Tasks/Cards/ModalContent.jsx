import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
// import { customTheme } from "@theme/theme";
// import IconsHeadings from "@common/AnimationMui/IconHeadings";
import {
  // AttachFile,
  // Close,
  // CommentSharp,
  // Description,
  CloseOutlined,
} from "@mui/icons-material";
// import DataGrids from "@common/TableMui/DataGrids";
// import { columnsFiles, rowsFiles } from "../../../UploadedFiles/data";
// import TabsCommon from "@common/TabsCommon";
// import TabFeedbackModal from "./TabFeedbackModal";
// import TabRemarksModal from "./TabRemarksModal";
import InputFields from "@common/InputFields/InputFields";
import ButtonMui from "@common/MUI/ButtonMUI";
import TypographyMUI from "@common/MUI/TypographyMUI";
function ModalContent({ dataCard, handleCloseModal }) {
  const [Tabs, setTabs] = useState(0);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={4}
      sx={{ height: "100%", overflow: "auto" }}
    >
      <Grid item sx={{ mb: 0 }} xs={12}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <TypographyMUI variant="h2">Update Info</TypographyMUI>
          <IconButton onClick={handleCloseModal}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <InputFields type={"text"} label={"Title"} />
      </Grid>
      <Grid item sx={{ pr: 1 }} xs={12} md={6}>
        <InputFields type={"date"} label={"Start Date"} />
      </Grid>
      <Grid item sx={{ pl: 1 }} xs={12} md={6}>
        <InputFields type={"date"} label={"End Date"} />
      </Grid>
      <Grid item xs={12}>
        <ButtonMui fullWidth={true} variant={"contained"}>
          Update
        </ButtonMui>
      </Grid>
      {/* <Grid sx={{ mt: 2 }}>
        <TabsCommon
          handleChange={handleChange}
          value={Tabs}
          arrayTabs={arrayTabs}
        />
      </Grid> */}
      {/* {Tabs === 0 && <TabFeedbackModal dataCard={dataCard} />}
      {Tabs === 1 && <TabRemarksModal />} */}
    </Grid>
  );
}

export default ModalContent;

const TabFeedback = () => {};

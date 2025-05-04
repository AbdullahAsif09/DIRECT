import { MoreVert } from "@mui/icons-material";
import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";

function UploadComp() {
  return (
    <Grid container justifyContent={"space-between"} gap={1}>
      <Grid item xs={12}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} gap={2}>
              <img src={"/assets/icons/icon-other.svg"} />
              <Stack direction={"column"} justifyContent={"space-evenly"}>
                <Typography variant="body1">Name of File</Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Typography variant="body1" color={"gray"}>
                Name of File
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                1341Mbs
              </Typography>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Stack>
            {/* <Fab component="label" size="medium">
              <CloudUpload sx={{ color: "#252B42" }} />
              <VisuallyHiddenInput type="file" />
            </Fab> */}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UploadComp;

import { CancelOutlined } from "@mui/icons-material";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function UploadCards() {
  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item xs={12} md={5.9} lg={3.9}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack direction={"row"} gap={2}>
            <img src="https://material-kit-pro-react.devias.io/assets/icons/icon-png.svg" />
            <Stack direction={"column"} justifyContent={"space-evenly"}>
              <Typography variant="body1">Banner.png</Typography>
              <Typography variant="body2" color={"gray"}>
                45MBs
              </Typography>
            </Stack>
            <IconButton sx={{ marginLeft: "auto", color: "#ee5253" }}>
              <CancelOutlined />
            </IconButton>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={5.9} lg={3.9}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack direction={"row"} gap={2}>
            <img src="https://material-kit-pro-react.devias.io/assets/icons/icon-png.svg" />
            <Stack direction={"column"} justifyContent={"space-evenly"}>
              <Typography variant="body1">Banner.png</Typography>
              <Typography variant="body2" color={"gray"}>
                45MBs
              </Typography>
            </Stack>
            <IconButton sx={{ marginLeft: "auto", color: "#ee5253" }}>
              <CancelOutlined />
            </IconButton>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={5.9} lg={3.9}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack direction={"row"} gap={2}>
            <img src="https://material-kit-pro-react.devias.io/assets/icons/icon-png.svg" />
            <Stack direction={"column"} justifyContent={"space-evenly"}>
              <Typography variant="body1">Banner.png</Typography>
              <Typography variant="body2" color={"gray"}>
                45MBs
              </Typography>
            </Stack>
            <IconButton sx={{ marginLeft: "auto", color: "#ee5253" }}>
              <CancelOutlined />
            </IconButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UploadCards;

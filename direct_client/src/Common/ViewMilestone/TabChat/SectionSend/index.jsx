import { AttachFileTwoTone, Send } from "@mui/icons-material";
import { Button, Grid, IconButton, Stack, TextField } from "@mui/material";

function SectionSend() {
  return (
    <Stack direction={"row"} gap={2}>
      <div style={{ height: "100%" }}>
        <IconButton sx={{ marginTop: "auto", marginBottom: "auto" }}>
          <AttachFileTwoTone />
        </IconButton>
      </div>
      <TextField fullWidth />
      <Button variant="contained">
        <Send />
      </Button>
    </Stack>
  );
}

export default SectionSend;

// <Grid container>
//   <Grid item xs={2}>
//     <IconButton>
//       <AttachFileTwoTone />
//     </IconButton>
//   </Grid>
//   <Grid item xs={8}>
//     <TextField fullWidth />
//   </Grid>
//   <Grid item xs={2}>
//     <Button variant="contained">
//       <Send />
//     </Button>
//   </Grid>
// </Grid>

import { FormatBold, FormatUnderlined, StrikethroughS } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";

function EditorContainer() {
  return (
    <div>
      {" "}
      <Grid container>
        <Grid item border={"1px solid grey"} padding={"20px"} xs={12}>
          <Stack direction={'row'} gap={1} >
            {" "}
            <IconButton>
              <FormatBold />
            </IconButton>
            <IconButton>
              <FormatUnderlined />
            </IconButton>
            <IconButton>
              <StrikethroughS />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item border={"1px solid grey"} height={"300px"} xs={12}>
          <textarea style={{ height: "100%", width: "100%" }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditorContainer;

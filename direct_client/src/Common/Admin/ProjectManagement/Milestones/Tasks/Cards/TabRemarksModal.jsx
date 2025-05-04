import { Button, Card, Grid, Stack } from "@mui/material";
import { customTheme } from "@theme/theme";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Comment, Timeline } from "@mui/icons-material";
import Editor from "@common/Editor";
import { TaskSlide } from "@common/UI";
function TabRemarksModal() {
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: customTheme.palette.boxShadows.boxShadowCardsLight,
            border: "none",
            p: 2,
            m: 0.5,
          }}
        >
          <IconsHeadings
            text={"Comments"}
            icons={<Comment sx={{ color: "#252B42" }} />}
          />
          <Editor />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            m: 0.5,
            boxShadow: customTheme.palette.boxShadows.boxShadowCardsLight,
          }}
        >
          <Stack direction={"column"} gap={2}>
            <IconsHeadings
              text={"Progress"}
              icons={<Timeline sx={{ color: "#252B42" }} />}
            />
            <TaskSlide />
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained">Save</Button>
      </Grid>
    </Grid>
  );
}

export default TabRemarksModal;

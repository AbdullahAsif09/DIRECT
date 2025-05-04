import { Divider, Grid, Paper, Stack, styled } from "@mui/material";
import IconsHeadings from "../../AnimationMui/IconHeadings";
import { AutoStories, Route } from "@mui/icons-material";
import TimelineMui from "../../TimelineMui";
import { TasksProject, TasksProjectTwo } from "../../../utils/ProjectsData";
import { RatingMui } from "../RatingMui";
import { useParams } from "react-router-dom";
import Editor from "../../Editor";
import DOMPurify from "dompurify";
import TypographyMUI from "../../MUI/TypographyMUI";
const StyledDiv = styled("div")({
  "& table, & th, & td, & tbody": {
    border: "1px solid black",
  },
  "& td": {
    padding: 8,
  },
  "& table": {
    width: "100%",
  },
  "& thead": {
    backgroundColor: "grey",
  },
});
export function TimelineUI({ ratingAdd, editor, milestoneData, feedback }) {
  const { id } = useParams();
  let sanitizedHTMLfeedback;
  if (feedback) {
    sanitizedHTMLfeedback = DOMPurify.sanitize(feedback);
  }
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid container gap={2} sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <IconsHeadings
              text={"Milestones"}
              icons={<Route sx={{ color: "#252B42" }} />}
            />
            {ratingAdd && <RatingMui />}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {milestoneData || milestoneData?.length > 0
            ? milestoneData?.map((e, i) => (
                <TimelineMui timelineData={e} key={i} c />
              ))
            : id == 90785644
            ? TasksProjectTwo?.map((e, i) => (
                <TimelineMui timelineData={e} key={i} />
              ))
            : TasksProject?.map((e, i) => (
                <TimelineMui timelineData={e} key={i} />
              ))}
        </Grid>

        <Grid item xs={12}>
          <Divider
            sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
            flexItem
          />
        </Grid>
        <Grid item xs={12}>
          {editor && (
            <Editor
              gap={1}
              required={true}
              label={"Remarks"}
              labelSize={"1.1rem"}
              labelWeight={600}
              onChange={editor}
            />
          )}
        </Grid>
        {feedback && (
          <Grid item xs={12}>
            <Stack direction={"column"} gap={2}>
              <IconsHeadings
                text={"Remarks"}
                icons={<AutoStories sx={{ color: "#252B42" }} />}
              />
              <TypographyMUI textAlign={"justify"} variant="body1">
                <StyledDiv
                  dangerouslySetInnerHTML={{ __html: sanitizedHTMLfeedback }}
                />
              </TypographyMUI>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

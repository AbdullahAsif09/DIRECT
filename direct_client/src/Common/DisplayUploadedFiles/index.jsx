import { AutoStories, Cloud } from "@mui/icons-material";
import { Divider, Grid, Paper, Stack, styled } from "@mui/material";
import IconsHeadings from "../AnimationMui/IconHeadings";
import FileDownloaded from "./FileDownloaded";
import { RatingMui } from "../UI";
import Editor from "../Editor";
import TypographyMUI from "../MUI/TypographyMUI";
import DOMPurify from "dompurify";
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
function DisplayUploadedFiles({
  ratingAdd,
  heading,
  editor,
  remarks,
  dataToShow,
  feedback,
}) {
  let sanitizedHTMLfeedback;
  if (feedback) {
    sanitizedHTMLfeedback = DOMPurify.sanitize(feedback);
  }
  const files = [
    // {
    //   type: "pdf",
    //   content: "PDF_CONTENT_HERE",
    //   fileName: "example.pdf",
    // },
    {
      type: "xml",
      content: "/ProjectDocument/Proposal submission.docx",
      fileName: "submission.docx",
    },
    {
      type: "xml",
      content: "/ProjectDocument/Proposal submission.docx",
      fileName: "submission2.docx",
    },
  ];
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid container gap={2} sx={{ height: "100%" }}>
        <Grid item xs={12}>
          {heading ? (
            heading
          ) : (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <IconsHeadings
                text={"Uploaded Files"}
                icons={<Cloud sx={{ color: "#252B42" }} />}
              />
              {ratingAdd && <RatingMui />}
            </Stack>
          )}
        </Grid>
        {dataToShow
          ? dataToShow?.map((e, i) => (
              <Grid item xs={12} key={i}>
                <FileDownloaded realData={e} />
              </Grid>
            ))
          : files.map((e, i) => (
              <Grid item xs={12} key={i}>
                <FileDownloaded realData={e} />
              </Grid>
            ))}
        {remarks && (
          <Grid item xs={12}>
            <Divider
              sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
              flexItem
            />
          </Grid>
        )}
        {remarks && (
          <Grid item xs={12}>
            <Editor
              gap={1}
              required={true}
              label={"Remarks"}
              labelSize={"1.1rem"}
              labelWeight={600}
              onChange={remarks}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider
            sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
            flexItem
          />
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

export default DisplayUploadedFiles;

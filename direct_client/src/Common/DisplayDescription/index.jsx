import { Divider, Paper, Stack, Typography, styled } from "@mui/material";
import IconsHeadings from "../AnimationMui/IconHeadings";
import { RatingMui } from "../UI";
import Editor from "../Editor";
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
function DisplayDescription({
  IconsHeadingsText,
  IconsHeadingsIcon,
  ratingValue,
  editorValue,
  htmlContent,
  onChange,
  content,
  rating,
  editor,
}) {
  let sanitizedHTML;
  if (htmlContent) {
    sanitizedHTML = DOMPurify.sanitize(htmlContent);
  }
  return (
    <div>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack direction={"column"} gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <IconsHeadings text={IconsHeadingsText} icons={IconsHeadingsIcon} />
            {rating && <RatingMui setValue={ratingValue} />}
          </Stack>
          {htmlContent ? (
            <Typography textAlign={"justify"} variant="body1">
              <StyledDiv dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </Typography>
          ) : (
            <Typography textAlign={"justify"} variant="body1">
              {content}
            </Typography>
          )}
        </Stack>
        <Divider
          sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
          flexItem
        />
        {editor && (
          <Editor
            gap={1}
            required={true}
            labelWeight={600}
            label={"Remarks"}
            value={editorValue}
            onChange={onChange}
            labelSize={"1.1rem"}
          />
        )}
      </Paper>
    </div>
  );
}

export default DisplayDescription;

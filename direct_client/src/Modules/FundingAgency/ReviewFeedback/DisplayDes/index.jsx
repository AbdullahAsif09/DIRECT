import { Divider, Paper, Rating, Stack, styled } from "@mui/material";
import React from "react";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import RatingMui from "@common/RatingMui";
import TypographyMUI from "@common/MUI/TypographyMUI";
import DOMPurify from "dompurify";
import { AutoStories, Feed } from "@mui/icons-material";
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
function DisplayDes({ heading, content, feedback, rating }) {
  let sanitizedHTMLContent;
  let sanitizedHTMLfeedback;
  if (content) {
    sanitizedHTMLContent = DOMPurify.sanitize(content);
  }
  if (feedback) {
    sanitizedHTMLfeedback = DOMPurify.sanitize(feedback);
  }
  return (
    <div>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack direction={"column"} gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <IconsHeadings
              text={heading}
              icons={<Feed sx={{ color: "#252B42" }} />}
            />
            <Rating name="read-only" value={rating ? rating : 0} readOnly />
          </Stack>
          <TypographyMUI textAlign={"justify"} variant="body1">
            <StyledDiv
              dangerouslySetInnerHTML={{ __html: sanitizedHTMLContent }}
            />
          </TypographyMUI>
        </Stack>
        <Divider
          sx={{ marginBlock: 3, backgroundColor: "lightGray" }}
          flexItem
        />
        <Stack direction={"column"} gap={2}>
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
        </Stack>
      </Paper>
    </div>
  );
}

export default DisplayDes;

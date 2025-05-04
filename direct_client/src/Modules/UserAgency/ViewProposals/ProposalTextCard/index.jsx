import { Paper, Stack, Typography, styled } from "@mui/material";
import React from "react";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import DOMPurify from "dompurify";
import { Description } from "@mui/icons-material";
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
function ProposalTextCard({ title, description }) {
  let sanitizedHTML = DOMPurify.sanitize(description);

  return (
    <div>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Stack direction={"column"} gap={2}>
          <IconsHeadings
            text={title}
            icons={<Description sx={{ color: "#252B42" }} />}
          />
          <Typography textAlign={"justify"} variant="body1">
            <StyledDiv dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          </Typography>
        </Stack>
      </Paper>
    </div>
  );
}

export default ProposalTextCard;

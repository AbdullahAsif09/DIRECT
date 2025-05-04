import { Grid, styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TypographyMUI from "../../../../MUI/TypographyMUI";
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

const GridStyled = styled(Grid)({
  "& img": {
    maxWidth: "100%",
    objectFit: "contain",
  },
});

const BoxSectionPara = ({ title, content }) => {
  const sanitizedHTML = DOMPurify.sanitize(content);
  const text = sanitizedHTML;

  return (
    <Box>
      <GridStyled item xs={12} sm={12} mt={2.7}>
        <TypographyMUI variant="subtitle2" sx={{ marginBottom: "5px" }}>
          {title}
        </TypographyMUI>
        <Box sx={{ p: 2, background: "#EFEFEF" }}>
          <StyledDiv dangerouslySetInnerHTML={{ __html: text }} />
        </Box>
      </GridStyled>
    </Box>
  );
};

export default BoxSectionPara;

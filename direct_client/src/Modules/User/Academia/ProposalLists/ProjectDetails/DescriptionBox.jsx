import { Card, Stack, styled } from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Description } from "@mui/icons-material";
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
  "& img": {
    minWidth: "300px",
    maxWidth: "600px",
    objectFit: "contain",
  },
});
function DescriptionBox({ heading, content }) {
  if (!content) return null;
  const sanitizedHTML = DOMPurify.sanitize(content);
  return (
    <div>
      <Card
        sx={{
          p: 2,
          boxShadow: (theme) => theme.palette.boxShadows.boxShadowTable,
        }}
      >
        <Stack gap={0} direction={"column"}>
          <IconsHeadings
            text={heading}
            icons={
              <Description
                sx={{ color: (theme) => theme.palette.bg.darkBlue }}
              />
            }
          />
          <StyledDiv dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </Stack>
      </Card>
    </div>
  );
}

export default DescriptionBox;

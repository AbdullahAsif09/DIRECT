import { Box, Stack } from "@mui/material";
import TypographyMUI from "../../../../MUI/TypographyMUI";

function OneLineBox({ title, content }) {
  return (
    <Stack sx={{ width: "100%", mt: 2.7 }} direction={"column"}>
      <TypographyMUI variant="subtitle2" sx={{ marginBottom: "5px" }}>
        {title}
      </TypographyMUI>
      <Box
        sx={{
          background: "#EFEFEF",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <TypographyMUI variant="subtitle2" component="h5">
          {content}
        </TypographyMUI>
      </Box>
    </Stack>
  );
}

export default OneLineBox;

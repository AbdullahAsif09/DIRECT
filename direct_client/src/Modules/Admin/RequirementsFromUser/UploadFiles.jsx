import { CloudUpload } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography, styled } from "@mui/material";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  borderRadius: "6px",
  border: "1px dashed" + theme.palette.bg.blue,
  background: "#E6E6E6",
  height: "200px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.bg.blue,
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.bg.blue,
}));
function UploadFiles() {
  return (
    <Grid container>
      <StyledGridItem item xs={12}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <StyledIconButton>
            <CloudUpload sx={{ fontSize: "50px" }} />
          </StyledIconButton>
          <StyledTypography variant="h4">Click here to upload your file</StyledTypography>
        </Stack>
      </StyledGridItem>
    </Grid>
  );
}

export default UploadFiles;

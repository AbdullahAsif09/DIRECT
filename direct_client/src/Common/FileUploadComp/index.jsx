import { Cloud } from "@mui/icons-material";
import { Card, Fab, Stack, Typography } from "@mui/material";

import FilesComp from "./FilesComp.jsx";
function FileUploadComp({ arrayFiles, setArrayFiles }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={2}
      >
        <Fab disabled size="medium" aria-label="upload">
          <Cloud sx={{ color: "#252B42" }} />
        </Fab>
        <Typography variant="h3">Upload Your Files</Typography>
      </Stack>
      {arrayFiles?.map((e, i) => (
        <FilesComp
          key={i}
          arrayFiles={e}
          setArrayFiles={setArrayFiles}
          // setproposalfileUpload={setproposalfileUpload}
        />
      ))}
    </Card>
  );
}

export default FileUploadComp;

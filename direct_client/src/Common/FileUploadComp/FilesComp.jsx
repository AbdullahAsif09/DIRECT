import { keys } from "@config";
import { CloudUpload, Download } from "@mui/icons-material";
import { Button, Card, Grid, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FilesComp({ arrayFiles, setArrayFiles }) {
  const [FileName, setFileName] = useState(null);
  const handleChange = (e, name) => {
    e.preventDefault();
    const fileUpload = e.target.files[0];
    setArrayFiles((prev) =>
      prev?.map((e) =>
        e?.name === arrayFiles?.name ? { ...e, value: fileUpload } : e
      )
    );
    setFileName(fileUpload);
  };
  return (
    <Grid container justifyContent={"space-between"} gap={1}>
      <Grid item xs={12}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} gap={2}>
              <img src={"/assets/icons/icon-other.svg"} />
              <Stack direction={"column"} justifyContent={"space-evenly"}>
                <Typography variant="h5">{arrayFiles?.name}</Typography>
                {FileName ? (
                  <Typography variant={"h6"}>({FileName?.name})</Typography>
                ) : null}
              </Stack>
            </Stack>
            <Stack flexDirection={"row"} gap={2}>
              <Button
                variant="contained"
                size="medium"
                component="label"
                color="primary"
                startIcon={<Download />}
                onClick={() => {
                  const url = keys.rootserver;
                }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                size="medium"
                component="label"
                sx={{
                  backgroundColor: "#5758BB",
                  "&:hover": {
                    backgroundColor: "#5758BB",
                  },
                }}
                startIcon={<CloudUpload />}
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleChange(e, arrayFiles?.name)}
                />
                Upload
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FilesComp;

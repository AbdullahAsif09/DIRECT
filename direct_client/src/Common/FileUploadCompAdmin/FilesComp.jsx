import { CloudUpload, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
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

function FilesComp({ arrayFiles, remove, index, values, hideAddMore }) {
  const [nameFile, setnameFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                {arrayFiles?.name ? (
                  <Typography variant="h5">{arrayFiles?.name}</Typography>
                ) : nameFile ? (
                  <Typography variant="h5">{nameFile?.name}</Typography>
                ) : (
                  <Typography variant="h5">No File</Typography>
                )}
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              {/* <Button
                variant="contained"
                size="medium"
                sx={{ backgroundColor: "#218c74" }}
                startIcon={<Save />}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#6465C3",
                  "&:hover": {
                    backgroundColor: "#6465C3",
                  },
                }}
                startIcon={<Edit />}
              >
                Edit
              </Button> */}
              {arrayFiles?.name ? null : (
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
                  // color="secondary"
                >
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      e.preventDefault();
                      values[index] = e.target.files[0];
                      setnameFile(e.target.files[0]);
                    }}
                  />
                  Upload
                </Button>
              )}
              {hideAddMore ? null : (
                <IconButton
                  onClick={() => remove(index)}
                  sx={{ color: "#ff7675" }}
                >
                  <Delete />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FilesComp;

import { Add, Cloud } from "@mui/icons-material";
import { Button, Card, Collapse, Fab, Stack, Typography } from "@mui/material";

import FilesComp from "./FilesComp.jsx";
import { TransitionGroup } from "react-transition-group";
import { FieldArray } from "formik";
import { customTheme } from "@theme/theme.jsx";
function FileUploadCompAdmin({
  values,
  handleChange,
  setFieldValue,
  hideAddMore,
}) {
  return (
    <FieldArray name={"uploadFiles"}>
      {({ push, remove }) => (
        <Card
          key={Math.random() * 10000}
          sx={{
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
            p: 3,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={2}
          >
            <Fab disabled size="medium" aria-label="eeupload">
              <Cloud sx={{ color: "#252B42" }} />
            </Fab>
            <Typography variant="h3">Upload Your Files</Typography>
            {hideAddMore ? null : (
              <Button
                sx={{
                  marginLeft: "auto",
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#008080",
                  },
                }}
                startIcon={<Add />}
                variant="contained"
                component="label"
                onClick={() => push(null)}
              >
                Add More
              </Button>
            )}
          </Stack>
          {values?.map((e, i) => (
            <TransitionGroup key={i}>
              <Collapse in>
                <div>
                  <FilesComp
                    hideAddMore={hideAddMore}
                    handleChange={handleChange}
                    index={i}
                    key={i}
                    remove={remove}
                    values={values}
                    arrayFiles={e}
                  />
                </div>
              </Collapse>
            </TransitionGroup>
          ))}
        </Card>
      )}
    </FieldArray>
  );
}

export default FileUploadCompAdmin;

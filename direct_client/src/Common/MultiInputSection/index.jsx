import {
  Button,
  Divider,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputFields from "../InputFields/InputFields";
import { Add, Delete, DeleteOutline, Remove } from "@mui/icons-material";
import { useState } from "react";
import { FieldArray } from "formik";

function MultiInputSection({
  headingSection,
  values,
  handleChange,
  LableHeadings,
  sectionName,
}) {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      rowGap={4}
    >
      <Grid item xs={12}>
        <FieldArray name={sectionName}>
          {({ push, remove }) => (
            <Grid
              rowGap={2}
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="h3">{headingSection}</Typography>

                  <Fab
                    size="small"
                    color="success"
                    aria-label="add"
                    onClick={() => {
                      const emptyObject = {};
                      for (const key in values[0]) {
                        emptyObject[key] = "";
                      }
                      push(emptyObject);
                    }}
                  >
                    <Add />
                  </Fab>
                </Stack>
              </Grid>
              {values.map((e, index) => (
                <Grid item key={index} xs={12}>
                  <Grid container rowGap={1.5} justifyContent={"space-between"}>
                    {Object.keys(e).map((value, i) => (
                      <Grid item xs={5.9} key={i}>
                        <InputFields
                          label={LableHeadings[i]}
                          placeholder={`Enter ${value}`}
                          type={"text"}
                          onChange={handleChange}
                          value={values[index][value]}
                          name={`${sectionName}[${index}].${value}`}
                          id={value}
                        />
                      </Grid>
                    ))}
                    <Grid
                      sx={{ mt: 6, mb: 8, position: "relative" }}
                      item
                      xs={12}
                    >
                      <Button
                        sx={{
                          padding: "5px 17px",
                          mt: -4,
                          border: "1px solid rgba(105, 42, 42, 1)",
                          color: "rgba(105, 42, 42, 1)",
                          "&:hover": {
                            border: "1px solid rgba(105, 42, 42, 1)",
                          },
                        }}
                        variant="outlined"
                        onClick={() => {
                          remove(index);
                        }}
                        startIcon={<DeleteOutline />}
                        disabled={values.length === 1 ? true : false}
                      >
                        Delete
                      </Button>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </FieldArray>
      </Grid>
    </Grid>
  );
}

export default MultiInputSection;

{
  /* {Array(Repeat)
    .fill(undefined)
    .map((e, i) => (
      <>
        {inputData.map((e, i) => (
          <Grid item xs={5.9} key={i}>
            <InputFields
              label={e}
              placeholder={`Enter ${e}`}
              type={"text"}
            />
          </Grid>
        ))}
        <Grid item xs={12} >
          <Divider />
        </Grid>
      </>
    ))} */
}

import { Button, Grid, Typography } from "@mui/material";
import TableMui from "@common/TableMui/CreateProfileTable";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { FieldArray } from "formik";

function TablesSecTwo({
  sectionName,
  ttext,
  headerArray,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  const [AddState, setAddState] = useState(1);
  const [DisableBtn, setDisableBtn] = useState(true);
  return (
    <>
      <FieldArray name={sectionName}>
        {({ push, remove }) => (
          <Grid container rowGap={2} sx={{ paddingBottom: "20px" }}>
            <Grid sx={{ display: "flex", alignItems: "center" }} item xs={10}>
              <Typography variant="h5" fontWeight={400}>
                {ttext}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                color="success"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => {
                  const emptyObject = {};
                  for (const key in values[0]) {
                    emptyObject[key] = "";
                  }
                  push(emptyObject);
                }}
              >
                Add More
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableMui
                sectionName={sectionName}
                remove={remove}
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setAddState={setAddState}
                setDisableBtn={setDisableBtn}
                AddState={AddState}
                DisableBtn={DisableBtn}
                headerArray={headerArray}
              />
            </Grid>
          </Grid>
        )}
      </FieldArray>
    </>
  );
}

export default TablesSecTwo;

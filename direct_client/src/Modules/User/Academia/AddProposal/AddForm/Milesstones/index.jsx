import {
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Add, Delete, Route } from "@mui/icons-material";
import InputFields from "@common/InputFields/InputFields";
import { FieldArray } from "formik";
import { TransitionGroup } from "react-transition-group";

function Milesstones({ values, handleChange }) {
  const arryaData = [
    {
      title: "Mobilization",
      startDate: "20%",
      endDate: "2 weeks",
      description:
        "During this phase, the project team will mobilize resources, including hiring of personnel required to start the project. ",
    },
    {
      title: "Design and Engineering Phase",
      startDate: "30%",
      endDate: "21 weeks",
      description: `The design and engineering team will create the detailed design and engineering drawings of the System. The milestones for this phase include:
o	Completion of design requirements and specifications 
o	Completion of 3D CAD modeling and simulation 
o	Completion of detailed engineering drawings 
`,
    },
    {
      title: "Manufacturing and Assembly Phaselization",
      startDate: "40%",
      endDate: "22 weeks",
      description: `During this phase, the team will manufacture and assemble the various mechanical components of the FLAIL system. The milestones for this phase include:
o	Completion of Aux Power Pack fitting
o	Fabrication of FLAIL Mechanism 
`,
    },
    {
      title: "Testing and Commissioning Phase",
      startDate: "10%",
      endDate: "3 weeks",
      description: `During this phase, the project team will test and commission the system to ensure that it meets the specific requirements of the User. The milestones for this phase include:
      o	Completion of factory acceptance testing 
      o	User Test and Trials 
`,
    },
  ];
  return (
    <FieldArray name="milesStones">
      {({ push, remove }) => (
        <Card sx={{ p: 3 }}>
          <Grid container gap={3}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              item
              xs={12}
            >
              <IconsHeadings
                text={"Milestones"}
                helpOutline={"Project Milestones are added here"}
                icons={<Route sx={{ color: "#252B42" }} />}
              />
              <Button
                sx={{
                  marginLeft: "auto",
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#008080",
                  },
                }}
                variant="contained"
                startIcon={<Add />}
                onClick={() =>
                  push({
                    title: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                Add More
              </Button>
            </Grid>
            <Grid item xs={12}>
              {arryaData?.map((e, i) => (
                <TransitionGroup key={i}>
                  <Collapse in>
                    <Grid
                      sx={{ mt: 6 }}
                      container
                      gap={2}
                      justifyContent={"space-between"}
                    >
                      {/* {Object.keys(e).map((event, index) => (
                        <Grid item xs={12} key={index}>
                          <InputFields
                            value={values[i][event]}
                            name={`milesStones[${i}]${event}`}
                            onChange={handleChange}
                            label={"Title"}
                            type={"text"}
                          />
                        </Grid>
                      ))} */}
                      <Grid item xs={12}>
                        <InputFields
                          value={e.title}
                          onChange={handleChange}
                          label={"Title"}
                          type={"text"}
                        />
                      </Grid>
                      <Grid item xs={5.9}>
                        <InputFields
                          value={e.startDate}
                          onChange={handleChange}
                          label={"Payment"}
                          type={"text"}
                        />
                      </Grid>
                      <Grid item xs={5.9}>
                        <InputFields
                          value={e.endDate}
                          onChange={handleChange}
                          label={"Duration"}
                          type={"text"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputFields
                          value={e.description}
                          onChange={handleChange}
                          label={"Description"}
                          type={"textbox"}
                          rows={"4"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ borderColor: "red" }}>
                          <IconButton
                            disabled={values.length < 2 ? true : false}
                            sx={{ border: "2px solid", color: "#ff7675" }}
                            onClick={() => remove(i)}
                          >
                            <Delete />
                          </IconButton>
                        </Divider>
                      </Grid>
                    </Grid>
                  </Collapse>
                </TransitionGroup>
              ))}
            </Grid>
          </Grid>
        </Card>
      )}
    </FieldArray>
  );
}

export default Milesstones;

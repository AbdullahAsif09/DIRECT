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
import { TransitionGroup } from "react-transition-group";

function Milesstones({ values, setValues, handleChange }) {
  return (
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
              setValues((prev) => [
                ...prev,
                {
                  title: "",
                  cost: 0,
                  duration: 0,
                  description: "",
                },
              ])
            }
          >
            Add More
          </Button>
        </Grid>
        <Grid item xs={12}>
          {values?.map((e, i) => (
            <TransitionGroup key={i}>
              <Collapse in>
                <Grid
                  sx={{ mt: 6 }}
                  container
                  gap={2}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={5.9}>
                    <InputFields
                      value={e?.title}
                      onChange={(e) =>
                        setValues((prev) =>
                          prev.map((item, index) => {
                            if (index === i) {
                              return { ...item, title: e.target.value };
                            }
                            return item;
                          })
                        )
                      }
                      placeholder={
                        "Write milestone title (e.g., Designing, Development)"
                      }
                      label={"Title"}
                      type={"text"}
                    />
                  </Grid>
                  <Grid item xs={5.9}>
                    <InputFields
                      value={e?.cost}
                      onChange={(e) =>
                        setValues((prev) =>
                          prev.map((item, index) => {
                            if (index === i) {
                              return { ...item, cost: e.target.value };
                            }
                            return item;
                          })
                        )
                      }
                      placeholder={
                        "Write payment in numbers (e.g., 120000 for 120000 rupees)"
                      }
                      label={"Payment"}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFields
                      value={e?.startDate}
                      onChange={(e) =>
                        setValues((prev) =>
                          prev.map((item, index) => {
                            if (index === i) {
                              return { ...item, duration: e.target.value };
                            }
                            return item;
                          })
                        )
                      }
                      placeholder={
                        "Enter duration in months (e.g., 12 for 12 months)"
                      }
                      label={"Duration"}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFields
                      value={e?.description}
                      onChange={(e) =>
                        setValues((prev) =>
                          prev.map((item, index) => {
                            if (index === i) {
                              return { ...item, description: e.target.value };
                            }
                            return item;
                          })
                        )
                      }
                      placeholder={"Write Description for this milestone"}
                      label={"Description"}
                      type={"textbox"}
                      rows={"4"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ borderColor: "red" }}>
                      <IconButton
                        disabled={values?.length < 2 ? true : false}
                        sx={{ border: "2px solid", color: "#ff7675" }}
                        onClick={() =>
                          setValues((prev) =>
                            prev.filter((_, index) => index !== i)
                          )
                        }
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
  );
}

export default Milesstones;

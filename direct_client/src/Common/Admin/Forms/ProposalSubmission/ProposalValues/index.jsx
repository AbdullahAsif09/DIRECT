import { Add, HelpOutline } from "@mui/icons-material";
import { Button, Card, Fab, Grow, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ProposalTests from "./ProposalTexts";
import { FieldArray } from "formik";
function ProposalValues({
  values,
  handleChange,
  setFieldValue,
  heading,
  section,
  icons,
}) {
  return (
    <FieldArray name={section}>
      {({ push, remove }) => (
        <Card sx={{ p: 3 }}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={2}
          >
            <Fab disabled size="medium" aria-label="eeupload">
              {icons}
            </Fab>
            <Typography variant="h3">{heading}</Typography>
            <Tooltip
              arrow
              title={
                " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text  ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              }
              TransitionComponent={Grow}
            >
              <HelpOutline sx={{ cursor: "pointer", color: "gray" }} />
            </Tooltip>
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
              onClick={() => push({ name: "" })}
            >
              Add More
            </Button>
          </Stack>
          {values?.map((e, i) => (
            <ProposalTests
              key={i}
              index={i}
              remove={remove}
              setFieldValue={setFieldValue}
              section={section}
              handleChange={handleChange}
              data={e}
            />
          ))}
        </Card>
      )}
    </FieldArray>
  );
}

export default ProposalValues;

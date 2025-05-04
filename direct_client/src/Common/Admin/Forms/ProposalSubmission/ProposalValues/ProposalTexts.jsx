import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import InputFields from "../../../../InputFields/InputFields";
import { Delete } from "@mui/icons-material";

function ProposalTests({ data, remove, index, handleChange, section }) {
  return (
    <Grid container justifyContent={"space-between"} gap={1}>
      <Grid item xs={12}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 2 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} gap={2}>
              <img src={"/assets/icons/icon-other.svg"} />
              <Stack direction={"column"} justifyContent={"space-evenly"}>
                <Typography variant="h5">
                  <InputFields
                    type={"text"}
                    placeholder={"Enter your Field Name"}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   e.preventDefault();
                    //   // setFieldValue(`${section}[${index}]name`, e.target.value);
                    // }}
                    value={data.name}
                    name={`${section}[${index}]name`}
                  />
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <IconButton
                onClick={() => remove(index)}
                sx={{ color: "#ff7675" }}
              >
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProposalTests;

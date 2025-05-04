import { Delete } from "@mui/icons-material";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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
                  <TextField
                    sx={{ width: "140%" }}
                    value={data.name}
                    name={`${section}[${index}]name`}
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder={"Enter your Field Name"}
                    onChange={handleChange}
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

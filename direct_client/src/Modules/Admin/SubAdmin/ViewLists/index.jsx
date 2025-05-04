import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Add, FilterList, Search } from "@mui/icons-material";
import DataGrids from "@common/TableMui/DataGrids";
import { useState } from "react";
import AddSubAdmin from "../AddSubAdmin";
import { customTheme } from "@theme/theme";

function ViewLists() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container gap={4} sx={{ mt: 8 }}>
      <Grid item xs={12}>
        <MainHeadings text={"Management Team"} />
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={handleClickOpen}
            startIcon={<Add />}
            variant="contained"
            color={"success"}
          >
            Add SubAdmin
          </Button>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <TextField
              color="success"
              type="text"
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ cursor: "pointer" }} position="end">
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <FilterList />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: customTheme.palette.boxShadows.boxShadowTable }}>
          <DataGrids />
        </Card>
      </Grid>
      <AddSubAdmin setOpen={setOpen} open={open} />
    </Grid>
  );
}

export default ViewLists;

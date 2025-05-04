import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const TaskHeader = () => {
  return (
    <Grid
        container
        width={"100%"}
        justifyContent={"end"}
        py={1}
        alignItems="center"
      >
        
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                 
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#0DA678",
                    },
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <FormControl
                size="small"
                variant="outlined"
                sx={{ minWidth: 120 }}
              >
                <InputLabel>Filter</InputLabel>
                <Select
                  label="Filter"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#0DA678",
                      },
                  }}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="new">New Project</MenuItem>
                  <MenuItem value="old">Old Project</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default TaskHeader
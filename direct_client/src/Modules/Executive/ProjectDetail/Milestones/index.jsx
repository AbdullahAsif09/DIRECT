import {
  Grid,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Divider,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import Card from "./Card";

const Milestones = () => {
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box width={"100%"} marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={2}>
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="highToLow">High to Low</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
              <MenuItem value="newestFirst">Newest First</MenuItem>
              <MenuItem value="oldestFirst">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

       {/* milestones  */}
       <Card/>
    </Box>
  );
};

export default Milestones;

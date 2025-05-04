import {
  Grid,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import AddOrganizationPopup from "./AddOrganizationPopup";
import AllOrganizations from "./AllOrganizations";
import React, { useState } from "react";

const Organizations = () => {
  const handleOpenPopup = () => setOpenPopup(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [newOrganization, setNewOrganization] = useState({});
  const handleClosePopup = () => setOpenPopup(false);
  const handleNewOrganization = (data) =>
    setNewOrganization(data, "Data of organization");

  return (
    <Grid padding={2}>
      <Typography variant="h3">Organizations</Typography>
      <Grid container>
        <Grid
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingY={2}
          flexWrap={"wrap"}
          flexDirection={"row"}
          item
          gap={1}
        >
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenPopup}
          >
            Add new Organization
          </Button>
          <TextField
            size="small"
            placeholder="Search Organization"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} item>
          <AllOrganizations newOrganization={newOrganization} />
        </Grid>
      </Grid>

      {/* AddOrganizationPopup */}
      <AddOrganizationPopup
        open={openPopup}
        onClose={handleClosePopup}
        handleNewOrganization={handleNewOrganization}
      />
    </Grid>
  );
};

export default Organizations;

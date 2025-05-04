import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AllDepartments from "./AllDepartments";
import AddDepartmentPopup from "./AddDepartmentPopup";

const Departments = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Grid padding={2}>
      <Grid container>
        <Grid
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingY={2}
          flexWrap={"wrap"}
          item
        >
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenPopup}
          >
            Add new Department
          </Button>
        </Grid>
        <Grid xs={12} item>
          <AllDepartments />
        </Grid>
      </Grid>

      {/* AddDepartmentPopup */}
      <AddDepartmentPopup open={openPopup} onClose={handleClosePopup} />
    </Grid>
  );
};

export default Departments;

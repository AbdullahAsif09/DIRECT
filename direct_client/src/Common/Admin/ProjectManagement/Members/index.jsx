import { AdminPanelSettings, LocationCity, Search } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CardSection from "./CardSections";
const arrayMangement = [
  {
    name: "Ali",
    admin: "Project Manager",
  },
  {
    name: "Aman",
    admin: "Web Admin",
  },
  {
    name: "Abdullah",
    admin: "Technical Evaluator",
  },
];
const arrayIndustry = [
  {
    name: "Dr Shahzad Rasool",
    admin: "Project Manager",
  },
];
const arrayFundingAgency = [
  {
    name: "RDE MoDP",
    admin: "",
  },
];
function Members() {
  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Grid container gap={6}>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
          <TextField
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>View All</MenuItem>
            <MenuItem value={20}>Management Team</MenuItem>
            <MenuItem value={30}>Industry</MenuItem>
            <MenuItem value={40}>Funding Agency</MenuItem>
          </Select>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <CardSection
          arrayCards={arrayMangement}
          sectionName={"Management Team"}
          icons={
            <AdminPanelSettings
              sx={{
                color: "bg.darkBlue",
                fontSize: "23px",
              }}
            />
          }
          color={"#2980b9"}
        />
      </Grid>
      <Grid item xs={12}>
        <CardSection
          arrayCards={arrayIndustry}
          sectionName={"Industry/Academia Researchers"}
          color={"#9c88ff"}
          icons={
            <BusinessIcon
              sx={{
                color: "bg.darkBlue",
                fontSize: "25px",
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CardSection
          arrayCards={arrayFundingAgency}
          sectionName={"Funding Agency"}
          color={"#fa8231"}
          icons={
            <LocationCity
              sx={{
                color: "bg.darkBlue",
                fontSize: "25px",
              }}
            />
          }
        />
      </Grid>
    </Grid>
  );
}

export default Members;

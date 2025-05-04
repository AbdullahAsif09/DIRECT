import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
const GridCustom = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "2rem",
}));
const GridItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5rem",
}));
function Filters({ filter, setFilter }) {
  return (
    <GridCustom item xs={12}>
      <TextField
        type="text"
        color="success"
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ cursor: "pointer" }} position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
          value: filter,
        }}
        onChange={(e) => {
          setFilter(e.currentTarget.value);
        }}
      />
    </GridCustom>
  );
}

export default Filters;

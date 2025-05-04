import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useRef } from "react";

export const SearchBar = ({ sx = {}, setSearched }) => {
  const ref = useRef();

  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    const target = e.target;
    const objects = {};
    const inputs = target.querySelectorAll(".MuiInputBase-root input");
    inputs.forEach((input) => {
      if (input.value) {
        objects[input.name] = input.value;
      }
    });
    setSearched(objects.searchInput);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#e6e6e6a8",
        height: "100%",
        fontSize: "13px",
        fontFamily: "var(--chatFont)",
        ...sx,
      }}
    >
      <InputBase
        inputRef={ref}
        name="searchInput"
        sx={{
          ml: 2,
          flex: 1,
          fontSize: "14px",
          color: "black",
          fontWeight: "350",
          letterSpacing: ".3px",
        }}
        placeholder={"Search list..."}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" aria-label="search">
        <SearchIcon sx={{ color: "575757" }} />
      </IconButton>
    </Paper>
  );
};

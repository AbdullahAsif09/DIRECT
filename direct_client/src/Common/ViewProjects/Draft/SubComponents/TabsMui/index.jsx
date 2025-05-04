import { Button, Grid, styled } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

const TabsCustom = styled(Tabs)(({ theme }) => ({
  borderBottom: "1px solid rgba(0, 0, 0, 0.34)",
  "& .Mui-selected": {
    background: "#F5F8FF",
  },
}));
const TabCustomOne = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  borderRight: "none",
  borderRadius: "5px",
}));
const TabCustomTwo = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  borderLeft: "none",
  borderRadius: "3px",
}));
function TabsMui() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <TabsCustom
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <TabCustomOne label="Draft" />
        <TabCustomTwo label="To be Published" />
      </TabsCustom>
    </div>
  );
}

export default TabsMui;

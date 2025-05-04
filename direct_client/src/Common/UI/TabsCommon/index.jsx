import { TabContext, TabList } from "@mui/lab";
import { Box, Grid, Tab, styled } from "@mui/material";

const TabsCustom = styled(TabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    background: "green !important",
    color: "green !important",
  },
  "& .Mui-selected": {
    background: "#F5F8FF",
    color: "green !important",
  },
}));
const TabCustom = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  "& .Mui-selected": {
    background: "#F5F8FF",
  },
}));
export function TabsCommon({ arrayTabs, value, handleChange }) {
  const isNum = typeof value === "number";
  const isStr = typeof value === "string";

  return (
    <TabContext
      sx={{ paddingBlock: "none" }}
      value={isNum || isStr ? value : undefined}
    >
      <TabsCustom onChange={handleChange}>
        {arrayTabs.map((e, i) => (
          <TabCustom label={e} key={i} value={i} />
        ))}
      </TabsCustom>
    </TabContext>
  );
}

import { Box } from "@mui/system";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
const DashBarChart = () => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
       <BarChart
        series={[
          { data: [3, 4, 1, 6, 5], stack: "A", label: "Projects" },
          { data: [4, 3, 1, 5, 8], stack: "A", label: "Proposals" },
          { data: [4, 2, 5, 4, 1], stack: "B", label: "Accepted" },
          { data: [2, 8, 1, 3, 1], stack: "B", label: "Rejected" },
          { data: [10, 6, 5, 8, 9], label: "Reviewing" },
        ]}
        width={800}
        height={400}
      />
    </Box>
  );
};

export default DashBarChart;

import { BarChart } from "@mui/x-charts";
import React from "react";

function BarChartMui({ dataset, xAxis, series }) {
  return (
    <BarChart
      onAxisClick={handleBarClick}
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "seoul", label: "In-Active Projects", valueFormatter },
        { dataKey: "london", label: "Pre-award Projects", valueFormatter },
        { dataKey: "paris", label: "In Progress Projects", valueFormatter },
        { dataKey: "newYork", label: "Completed Projects", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}

export default BarChartMui;

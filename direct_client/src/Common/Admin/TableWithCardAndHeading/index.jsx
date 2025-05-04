import { Card } from "@mui/material";
import React from "react";
import IconsHeadings from "../../AnimationMui/IconHeadings";
import DataGrids from "../../TableMui/DataGrids";

function TableWithCardAndHeading({
  dataGridRow,
  dataGridCol,
  headingText,
  iconHeading,
}) {
  return (
    <div>
      <Card
        sx={{
          boxShadow: (theme) => theme.palette.boxShadows.boxShadowTable,
        }}
      >
        <IconsHeadings
          text={headingText}
          paddingLeft={2.7}
          paddingTop={3}
          paddingBottom={2}
          icons={iconHeading}
        />
        <DataGrids dataRow={dataGridRow} dataColumn={dataGridCol} toolBarGrid />
      </Card>
    </div>
  );
}

export default TableWithCardAndHeading;

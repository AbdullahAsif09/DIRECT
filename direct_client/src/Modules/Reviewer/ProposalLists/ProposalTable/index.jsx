import { Card } from "@mui/material";
import { customTheme } from "@theme/theme";
import DataGrids from "@common/TableMui/DataGrids";
import data from "./data";

function ProposalTable({ ProposalData }) {
  const { columns } = data();
  return (
    <Card
      sx={{ p: 2, boxShadow: customTheme.palette.boxShadows.boxShadowTable }}
    >
      <DataGrids dataRow={ProposalData} dataColumn={columns} />
    </Card>
  );
}

export default ProposalTable;

import { Card, Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import DataGrids from "@common/TableMui/DataGrids";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { ReceiptLongRounded } from "@mui/icons-material";
import data from "./data";

function Home() {
  const { rows, columns, AgencyProjects } = data();
  return (
    <Grid container gap={6} sx={{ pt: 6, pb: 4, height: "100%" }}>
      <Grid item xs={12}>
        <MainHeadings text={"Dashboard"} />
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: (theme) => theme.palette.boxShadows.boxShadowTable,
          }}
        >
          <IconsHeadings
            text={"My Projects"}
            paddingLeft={2.7}
            paddingTop={3}
            paddingBottom={2}
            icons={<ReceiptLongRounded sx={{ color: "bg.darkBlue" }} />}
          />
          <DataGrids
            dataRow={AgencyProjects}
            dataColumn={columns}
            toolBarGrid
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Home;

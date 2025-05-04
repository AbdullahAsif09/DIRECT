import { Card, Grid } from "@mui/material";
import IconsHeadings from "../../AnimationMui/IconHeadings";
import { customTheme } from "@theme/theme";

function CardsOfCreateProjects({ title, icons, content, helpOutline, rowGap }) {
  return (
    <Card
      sx={{ p: 3, boxShadow: customTheme.palette.boxShadows.boxShadowNormal }}
    >
      <Grid container rowGap={rowGap ? rowGap : 0}>
        <Grid item xs={12}>
          <IconsHeadings text={title} helpOutline={helpOutline} icons={icons} />
        </Grid>
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
    </Card>
  );
}

export default CardsOfCreateProjects;

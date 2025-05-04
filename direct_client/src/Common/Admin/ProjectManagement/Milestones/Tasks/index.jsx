import { Card, Grid, MenuItem, Select, Stack } from "@mui/material";
import Cards from "./Cards";
import { customTheme } from "@theme/theme";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Route } from "@mui/icons-material";
function Tasks({ taskDetails }) {
  const arraySelect = [
    "Newest",
    "Oldest",
    "Complete",
    "Testing",
    "In Progress",
    "Not Started",
  ];
  return (
    <Card
      sx={{
        pt: 3,
        pb: 3,
        pl: 3,
        pr: 3,
        boxShadow: customTheme.palette.boxShadows.boxShadowTable,
      }}
    >
      <Grid container justifyContent={"flex-start"} rowGap={2}>
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconsHeadings
              text="Milestones"
              icons={<Route sx={{ color: "bg.darkBlue" }} />}
            />
            <Select defaultValue={0}>
              {arraySelect?.map((e, i) => (
                <MenuItem value={i} key={i}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>
        {taskDetails.map((e, i) => (
          <Grid item md={6} lg={6} xl={4}>
            <Cards dataCard={e} index={i} key={i} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default Tasks;

import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Cards from "../Cards";
import { Add, Delete } from "@mui/icons-material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";

function CardSection({ sectionName, icons, arrayCards }) {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <IconsHeadings text={sectionName} icons={icons} />
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={3}>
          {arrayCards?.map((e, i) => (
            <Grid item xs={3} key={i}>
              <Cards sectionName={sectionName} dataCards={e} />
            </Grid>
          ))}
          {sectionName === "Management Team" && (
            <Grid item xs={3}>
              <Card
                sx={{
                  height: "371px",
                  cursor: "pointer",
                  m: 1,
                  pb: 15,
                  pt: 15,
                  pr: 4,
                  pl: 4,
                  boxShadow: "0px 0px 10px 0px rgba(7, 6, 18, 0.20)",
                }}
              >
                <Grid
                  container
                  gap={2}
                  sx={{ height: "100%" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Stack direction={"row"} gap={1}>
                    <Add />
                    <Typography variant="h4">Add More</Typography>
                  </Stack>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CardSection;

import { Button, Card, Divider, Grid, Stack } from "@mui/material";
import { customTheme } from "@theme/theme";
import { ProgressMui } from "@common/UI";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useGetQueryParam } from "@hooks";

function Cards({ dataCard, index }) {
  const navigate = useNavigate();

  const handleProjectStatus = () => {
    if (
      dataCard?.progress !== undefined &&
      dataCard?.progress !== null &&
      dataCard?.progress > 0 &&
      dataCard?.progress < 100
    ) {
      dataCard.status = "In Progress";
      dataCard.statusColor = customTheme.palette.bg.lightPurple;
    }
    if (
      dataCard?.progress == 100 &&
      dataCard?.progress !== undefined &&
      dataCard?.progress !== null
    ) {
      dataCard.status = "Completed";
      dataCard.statusColor = customTheme.palette.bg.blue;
    }
    if (
      dataCard?.progress === 0 ||
      dataCard?.progress === undefined ||
      dataCard?.progress === null
    ) {
      dataCard.status = "Not Started";
      dataCard.statusColor = "red";
    }
  };
  const id = useGetQueryParam("id");
  const milestoneID = useGetQueryParam("milestones");

  const handleNavigate = () => {
    const baseUrl = `/department/dashboard/projectmangent/${id}`;
    navigate(`${baseUrl}/milestone/${milestoneID}?no=${index}`);
  };
  useEffect(() => {
    handleProjectStatus();
  }, [dataCard?.progress]);
  return (
    <Card
      sx={{
        p: 2,
        ml: 1,
        mr: 1,
        boxShadow: customTheme.palette.boxShadows.boxShadowCardsLight,
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            sx={{ pt: 1 }}
          >
            <TypographyMUI
              sx={{ width: "90%" }}
              noWrap
              variant="h5"
              fontWeight={600}
            >
              {dataCard.title}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Task No.</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={600}>
              {index + 1}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Attachments:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={600}>
              0
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Duration:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={500}>
              {dataCard.duration}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProgressMui value={dataCard?.progress ? dataCard.progress : 0} />
        </Grid>
        <Grid item xs={12}>
          <Button
            component={motion.div}
            sx={{ textTransform: "capitalize", letterSpacing: 0.5 }}
            whileTap={{ scale: 0.9 }}
            variant="contained"
            size="small"
            onClick={handleNavigate}
          >
            View
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Cards;

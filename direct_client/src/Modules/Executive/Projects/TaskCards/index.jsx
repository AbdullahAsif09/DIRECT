import { Button, Card, Divider, Grid, Stack, styled, Typography } from "@mui/material";
import { customTheme } from "@theme/theme";
import { ProgressMui } from "@common/UI";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useExtractParaTag } from "../../../../Hooks";
import useStartEndDate from "@hooks/useStartEndDate";
const Pstyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  // lineHeight: 1.6,
  fontWeight: "400",
  minHeight: "38px",
}));
function TaskCards({ dataCard, index, handleOpenModal }) {
  const navigate = useNavigate();
  const paragraph = useExtractParaTag(dataCard?.description);
  const { endDate, startDate } = useStartEndDate(dataCard?.milestones?.[0]);
  const Cost = dataCard?.milestones?.[0]?.details?.reduce((acc, milestone) => {
    return acc + milestone.cost;
  }, 0);
  const duration = dataCard?.milestones?.[0]?.details?.reduce((acc, milestone) => {
    return acc + milestone.duration;
  }, 0);
  const progress = dataCard?.milestones?.[0]?.details?.reduce((acc, milestone) => {
    return acc + milestone.progress;
  }, 0);
  const averageProgress = progress / dataCard?.milestones?.[0]?.details?.length;

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
        minHeight: "370px",
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
            <TypographyMUI sx={{ width: "100%" }} variant="h4" fontWeight={600}>
              {dataCard?.title}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12}>
          <Pstyled>{paragraph}</Pstyled>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Created At:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={600}>
              {new Date(dataCard?.createdAt).toDateString()}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Cost:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={600}>
              {Cost ? Cost + " PKR" : "project not assigned"}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Duration:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={500}>
              {duration ? duration + " Months" : "project not assigned"}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1}>
            <TypographyMUI variant="body2">Due Date:</TypographyMUI>
            <TypographyMUI variant="body2" fontWeight={500}>
              {!isNaN(endDate.getTime()) ? endDate.toDateString() : "project not assigned"}
            </TypographyMUI>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProgressMui value={averageProgress ? averageProgress : 0} />
        </Grid>

        <Grid item xs={12} display={"flex"} gap={1}>
          <Button
            component={motion.div}
            sx={{ textTransform: "capitalize", letterSpacing: 0.5 }}
            whileTap={{ scale: 0.9 }}
            variant="contained"
            size="small"
            disabled={dataCard?.milestones?.[0] ? false : true}
            onClick={() =>
              navigate(
                `/executive/projectmanagement/${dataCard?._id}?milestones=${dataCard?.milestones?.[0]?._id}`
              )
            }
          >
            View
          </Button>
          <Button
            component={motion.div}
            sx={{ textTransform: "capitalize", letterSpacing: 0.5 }}
            whileTap={{ scale: 0.9 }}
            variant="contained"
            size="small"
            onClick={() => {
              handleOpenModal(dataCard?._id);
            }}
          >
            Add Comments
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TaskCards;

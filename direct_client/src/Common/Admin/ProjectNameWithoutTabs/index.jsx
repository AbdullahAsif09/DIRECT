import { Avatar, Grid, Stack, Typography, styled } from "@mui/material";
import { keys } from "@config";
import { useExtractParaTag } from "@hooks";
const AvatarUpload = styled(Avatar)(({ theme }) => ({
  width: "170px",
  height: "170px",
  borderRadius: "15px",
}));
const Pstyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  // lineHeight: 1.6,
  fontWeight: "400",
}));

function ProjectNameWithoutTabs({ dataProject }) {
  const paragraph = useExtractParaTag(dataProject?.description);
  return (
    // <Card sx={{ p: 2 }}>
    <Grid container>
      <Grid item xs={12}>
        <Stack width={"100%"} direction={"row"} gap={2}>
          <AvatarUpload
            src={keys.rootserver + dataProject?.image}
            variant="square"
          />
          <Stack
            width={"100%"}
            direction={"column"}
            justifyContent={"space-evenly"}
            alignItems={"flex-start"}
          >
            <Typography
              variant="h3"
              fontSize={"24px"}
              lineHeight={1.5}
              display={"block"}
              width={"80%"}
            >
              {dataProject?.title}
            </Typography>
            <Pstyled textAlign={"justify"} width={"85%"} variant="body1">
              {paragraph}
            </Pstyled>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
    // </Card>
  );
}

export default ProjectNameWithoutTabs;

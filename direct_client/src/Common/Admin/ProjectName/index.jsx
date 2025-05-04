import {
  styled,
  Avatar,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { customTheme } from "@theme/theme";
import { motion } from "framer-motion";
import { keys } from "@config";
import { useWindowSize } from "@hooks/useWindowSize";
const AvatarUpload = styled(Avatar)(({ theme }) => ({
  width: "170px",
  height: "170px",
  borderRadius: "15px",
}));
const Pstyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 5,
  // lineHeight: 1.6,
  fontWeight: "400",
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.darkBlue,
  "&:hover": {
    backgroundColor: theme.palette.bg.secondDarkBlue,
  },
}));
function getFirstPTagContent(str) {
  const match = str?.match(/<p>(.*?)<\/p>/);
  return match ? match[1] : null;
}
function ProjectName({ value, handleChange, arrayTabs, details }) {
  const ButtonVariants = {
    initial: {
      opacity: 0,
      y: 50,
      // scale: 0.9,
    },
    final: {
      opacity: 1,
      y: 0,
      // scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 150 },
      // transition: { delay: 1, duration: .5 },
    },
  };
  const paragraphy = getFirstPTagContent(details?.description);
  const width = useWindowSize();

  return (
    <Card
      sx={{
        p: 3,
        mt: 2,
        boxShadow: customTheme.palette.boxShadows.boxShadowTable,
      }}
    >
      <Grid container gap={0.5}>
        <Grid item xs={12}>
          <Stack
            width={"100%"}
            direction={"row"}
            gap={2}
            sx={{
              flexDirection: width < 800 ? "column" : "row",
              alignItems: width < 800 ? "center" : "flex-start",
              textAlign: width > 800 ? "left" : "center",
            }}
          >
            <AvatarUpload
              src={
                details?.image?.[0] ? keys.rootserver + details?.image?.[0] : ""
              }
              variant="square"
            />
            <Stack
              width={"100%"}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
              flex={1}
            >
              <Typography
                variant="h3"
                fontSize={"24px"}
                lineHeight={1.5}
                display={"block"}
              >
                {details?.title}
              </Typography>
              <Pstyled textAlign={"left"} width={"100%"} variant="body1">
                {paragraphy}
              </Pstyled>
              {/* <ButtonStyled
                component={motion.div}
                variants={ButtonVariants}
                initial={"initial"}
                animate={"final"}
                variant="contained"
              >
                View More
              </ButtonStyled> */}
            </Stack>
          </Stack>
        </Grid>
        {arrayTabs && (
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Divider></Divider>
          </Grid>
        )}
        {arrayTabs && (
          <Grid item xs={12}>
            <Tabs
              color={"success"}
              value={value}
              onChange={handleChange}
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {arrayTabs?.map((e, i) => (
                <Tab color={"success"} key={i} label={e} />
              ))}
            </Tabs>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

export default ProjectName;

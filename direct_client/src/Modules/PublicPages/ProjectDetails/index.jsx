import { Grid, Stack, Typography, styled } from "@mui/material";
import { SectionContainer } from "@common/UI";
import {
  CalendarMonth,
  ArrowRightAlt,
  LocationOn,
  Leaderboard,
  AttachMoney,
  Bookmark,
} from "@mui/icons-material";
import { SolidButton, TransparentButton } from "@common/Buttons";
import { Box } from "@mui/system";
import { StatusStyled } from "@common/UI/ButtonsUI";

const arr = [
  {
    title: "Job Expiry",
    status: "Expired",
    Icon: <CalendarMonth />,
  },
  {
    title: "Location",
    status: "Islamabad",
    Icon: <LocationOn />,
  },
  {
    title: "Proposals",
    status: "30",
    Icon: <Leaderboard />,
  },
  {
    title: "Price Type",
    status: "Hourly",
    Icon: <AttachMoney />,
  },
];

const str = `   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Qui dicta minus molestiae vel beatae natus eveniet ratione
                    temporibus aperiam harum alias officiis assumenda officia
                    quibusdam deleniti eos cupiditate dolore doloribus! Qui
                    dicta minus molestiae vel beatae natus eveniet ratione
                    temporibus aperiam harum alias officiis assumenda officia
                    quibusdam deleniti eos cupiditate dolore doloribus!`;
function ProjectDetails() {
  return (
    <SectionContainer>
      <DetailsPageHeading variant="h1">PROJECT DETAILS</DetailsPageHeading>
      <Grid container mt={"80px"}>
        <Grid
          item
          xs={12}
          lg={8.5}
          justifyContent={"space-between"}
          display={"flex"}
          flexDirection={"column"}
          gap={"2.5rem"}
        >
          <ProjectHeadingStyled variant="h1">
            Senior System Engineer Is Required
          </ProjectHeadingStyled>
          <MetaInfoStyled>
            <CalendarMonth />
            {new Date(` 10 Apr 2023`).toDateString()}
            <StatusStyled>Full Time</StatusStyled>
          </MetaInfoStyled>
          <ButtonsRow>
            <TransparentButton>
              Save Project
              <Bookmark color="red" />
            </TransparentButton>

            <SolidButton>
              Send Proposal
              <ArrowRightAlt sx={{ width: "25px", height: "25px" }} />
            </SolidButton>
          </ButtonsRow>
          <StatusRow>
            {arr?.map((Com, i) => {
              return <StatusComp {...Com} key={i} />;
            })}
          </StatusRow>

          {/* Text Section Starts */}
          <TextSection>
            <Typography variant="h2" fontWeight={500} marginBottom={"1.5rem"}>
              Description
            </Typography>
            {Array(6)
              .fill(null)
              .map((e, i) => {
                return (
                  <TypographyStyled variant="body1" fontWeight={400} key={i}>
                    {String(str).trim(0, Math.random(i + 1 * str.length))}
                  </TypographyStyled>
                );
              })}
          </TextSection>
        </Grid>
        {/* <Grid item xs={12} lg={3}>
          SideLine
        </Grid> */}
      </Grid>
    </SectionContainer>
  );
}

export default ProjectDetails;

const StatusComp = (props) => {
  return (
    <Box
      sx={{
        border: `1px solid #E8E8E8`,
        borderRadius: "5px",
        background: "#FFF",
        padding: "20px 21px",
        color: "#A6A6A6",

        "& svg": {
          background: "#F7F7F7",
          padding: ".4rem",
          color: "#C4C4C4",
          boxSizing: "content-box",
        },
        // minWidth: "200px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"1rem"}
        columnGap={"5rem"}
      >
        <Stack gap={"1rem"} flex={1}>
          <Typography
            variant="body2"
            color={"rgba(110, 114, 125, 1)"}
            fontSize={15}
            fontWeight={500}
          >
            {props?.title ? props?.title : "Job Expiry"}
          </Typography>
          <Typography variant="h4">
            {props?.status ? props?.status : "Expired"}
          </Typography>
        </Stack>
        {props?.Icon ? props?.Icon : <CalendarMonth />}
      </Stack>
    </Box>
  );
};

const DetailsPageHeading = styled(Typography)((data) => ({
  color: "#A6A6A6",
  fontSize: "3rem",
  fontWeight: 600,
  textTransform: "capitalize",
}));

const ProjectHeadingStyled = styled(Typography)((data) => ({
  color: data?.theme.palette.background.black,
  fontSize: "2rem",
  fontWeight: "550",
}));
const TypographyStyled = styled(Typography)((data) => ({
  color: "grey",
  lineHeight: "30px",
  fontSize: "1rem",
  marginBottom: "1rem",
}));
const MetaInfoStyled = styled(Stack)((data) => ({
  color: "#A6A6A6",
  gap: ".5rem",
  marginTop: "-1rem",
  flexDirection: "row",
  alignItems: "center",

  svg: {
    fontSize: "1.25rem",
  },
}));
const ButtonsRow = styled(Stack)((data) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  maxWidth: "450px",
}));
const StatusRow = styled(Stack)((data) => ({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1rem",
}));
const TextSection = styled("div")((data) => ({}));

const ImageCom = styled("img")(() => ({
  height: "25px",
  width: "25px",
  margin: "auto",
  display: "block",
  color: "red",
}));

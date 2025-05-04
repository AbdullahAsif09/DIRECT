import { Grid, Stack, Typography, styled } from "@mui/material";
import {
  CalendarMonth,
  ArrowRightAlt,
  Leaderboard,
  Bookmark,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import SectionContainer from "../../Containers/SectionContainer";
import { SolidButton, TransparentButton } from "../../Buttons";
import { StatusStyled } from "../../UI/ButtonsUI";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DescriptionSections from "./DescriptionSections";
import { useGetRole } from "@hooks";

const GRID = styled(Grid)(({ theme }) => ({
  ["@media screen  and (min-width:1799px)"]: {},
}));
const arr = [
  {
    title: "Job Expiry",
    status: "December 12th, 2024 ",
    Icon: <CalendarMonth />,
  },
  // {
  //   title: "Location",
  //   status: "Islamabad",
  //   Icon: <LocationOn />,
  // },
  {
    title: "Proposals",
    status: "30",
    Icon: <Leaderboard />,
  },
];
const TestData = {
  title: "Description",
  description: `Intelligence operations play a vital role in the national security of a country. Law enforcement forces rely on the intelligence reports to conduct operations for preventing terrorist activities. It is important that intelligence reports be accurate and timely. One of the main challenges faced by the law enforcement forces during Surveillance and Reconnaissance missions are the lack of infrastructure for communication and monitoring. Mostly these operations were conducted in remote areas, with no such facilities. Recognizing this need for law enforcement forces and also to address this challenge we proposed a wireless based multi camera imagery device for real-time capturing and transmission of imagery data to a nearly deployed Ad-hoc mobile base station. The proposed solution consists of a software and hardware pipeline for a throwable  ball shaped imaging device, that would be able to capture the high resolution imagery  data using multiple RGB cameras and transmit that data to a base-station. At base  station, the artificial intelligence algorithm will be applied to the imagery data for detecting the person of interest. Using throwable imagery devices for surveillance application will allow law enforcement forces to effectively locate, observe and engage a range of targets in their       intelligence, surveillance and reconnaissance (ISR) mission
      ${" "}      
      The envisioned surveillance system represents a cutting-edge integration of hardware and software components designed to significantly bolster the capabilities of law enforcement during Surveillance and Reconnaissance missions. At its core is a throwable, ball-shaped imaging device, meticulously engineered to navigate and capture high-resolution imagery in challenging terrains. The spherical structure, akin to a football in size (approximately 23 cm in diameter), facilitates stable rotation in all directions, ensuring a complete and dynamic field of view. This device houses a sophisticated array of 16 RGB cameras strategically positioned to capture a panoramic perspective. Real-time data transmission to a deployable Ad-hoc mobile base station forms a pivotal aspect of the system, enabling immediate access to critical intelligence reports. The software pipeline integrates artificial intelligence algorithms for the detection of persons of interest, elevating the system beyond mere data collection to actionable insights.
      ${" "}
      In conclusion, this comprehensive surveillance system not only offers a groundbreaking solution to existing challenges in intelligence operations but also lays the foundation for adaptable and scalable advancements in the future. The integration of state-of-the-art technology, user-friendly interfaces, and a forward-looking approach positions this system as a pivotal tool for law enforcement agencies striving for enhanced capabilities in intelligence, surveillance, and reconnaissance missions.`,
};
function LeftSection({ data }) {
  const [ShowMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.profile);
  const role = useGetRole();
  const isIndustry = role === "industry";
  const isAcademia = role === "academia";
  return (
    <SectionContainer>
      <DetailsPageHeading variant="h1">PROJECT DETAILS</DetailsPageHeading>
      <Grid container mt={"80px"} gap={4}>
        <Grid
          item
          xs={12}
          lg={12}
          justifyContent={"space-between"}
          display={"flex"}
          flexDirection={"column"}
          gap={"2.5rem"}
        >
          <ProjectHeadingStyled variant="h1">
            {data?.title ? data?.title : "Senior System Engineer Is Required"}
          </ProjectHeadingStyled>
          <MetaInfoStyled>
            <CalendarMonth />
            {new Date(data?.startDate).toDateString()}
            <StatusStyled>Full Time</StatusStyled>
          </MetaInfoStyled>
          <ButtonsRow>
            <TransparentButton>
              Save Project
              <Bookmark color="red" />
            </TransparentButton>
            {isIndustry && (
              <SolidButton onClick={() => navigate("/industry/addproposal")}>
                Send Proposal
                <ArrowRightAlt sx={{ width: "25px", height: "25px" }} />
              </SolidButton>
            )}
          </ButtonsRow>
          <StatusRow>
            {arr?.map((Com, i) => {
              return <StatusComp {...Com} key={i} />;
            })}
          </StatusRow>
        </Grid>
        <Grid sx={{ mt: 4 }} item xs={12}>
          <DescriptionSections
            setShowMore={setShowMore}
            ShowMore={ShowMore}
            DescriptionData={TestData}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <DescriptionSections
            setShowMore={setShowMore}
            ShowMore={ShowMore}
            DescriptionData={TestData}
          /> */}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </SectionContainer>
  );
}

export default LeftSection;

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
const TextSection = styled("div")((data) => ({
  padding: ".8rem 0rem .2rem 0rem",
}));
const ViewDescriptionGrid = styled(Grid)((data) => {
  const isTrue = data?.["aria-current"];
  return {
    background: isTrue === false ? "rgb(238,238,238)" : "none",
    background:
      isTrue === false
        ? "linear-gradient(to top,white 0%, rgba(255,255,255,0.4) 100%)"
        : "none",
    paddingtop: "10px",
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-100px",
    ["@media screen  and (min-width:1799px)"]: {
      // display: "none",
    },
  };
});
const TypographyStyled = styled(Typography)((data) => {
  const isTrue = data?.["aria-current"];
  return {
    color: "grey",
    lineHeight: "30px",
    fontSize: "1rem",
    marginBottom: "1rem",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: isTrue === true ? 12222 : 10,
    textAlign: "left",
    ["@media screen  and (max-width:1798px)"]: {},
    // lineHeight: 1.6,
    // height: "95px",
  };
});
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

const ImageCom = styled("img")(() => ({
  height: "25px",
  width: "25px",
  margin: "auto",
  display: "block",
  color: "red",
}));

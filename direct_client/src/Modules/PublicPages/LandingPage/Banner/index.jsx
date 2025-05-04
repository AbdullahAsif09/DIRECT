import { Grid, Typography, styled, Stack } from "@mui/material";
import { data } from "./data";
import Rightside from "./Rightside.jsx";
import { forwardRef, useEffect, useRef, useState, useCallback } from "react";
import { dataProject } from "../../../../utils/ProjectsData.js";
import RightsideProjects from "./RightsideProjects.jsx";
import debounce from "lodash.debounce"; // Make sure to install lodash.debounce
import { Box } from "@mui/system";

// Styled components
const ImageStyled = styled("img")(() => ({
  zIndex: -1,
  width: "100%",
  animation: "show32 .34s linear forwards",
  display: "block",
  objectFit: "contain",
  height: "max-content",
  "@keyframes show32": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));

const GridColor = styled(Grid)(({ theme }) => ({
  background: theme.palette.bg.black,
  paddingBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    height: "max-content",
  },
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none", // Hide scrollbars for Firefox
  msOverflowStyle: "none", // Hide scrollbars for IE and Edge
}));

const GridImage = styled(Grid)(({ theme }) => ({
  background: theme.palette.bg.black,
  [theme.breakpoints.down("lg")]: {
    width: "100vw",
    objectFit: "contain",
  },
}));
const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.bg.black,
}));

const slide = data?.[0];

const BannerCarousel = () => {
  const ref = useRef();
  const [height, setHeight] = useState(
    window.innerWidth < 1200 ? "unset" : 520
  );

  // Debounced resize listener
  const handleResize = useCallback(
    debounce(() => {
      setHeight(window.innerWidth < 1200 ? "unset" : ref.current.clientHeight);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <StyledBox>
      <Grid container sx={{ maxHeight: height, overflow: "hidden" }}>
        <GridColor
          item
          xs={12}
          md={12}
          lg={2.35}
          xl={2.5}
          padding={1.5}
          sx={{ maxHeight: height, overflowY: "auto", pt: 2 }}
        >
          <Stack gap={4} direction="column">
            <Typography variant="h3" color="white">
              Projects
            </Typography>

            {dataProject.map((d, ind) => (
              <RightsideProjects
                data={d}
                key={ind}
                isLast={dataProject.length - 1 === ind}
              />
            ))}
          </Stack>
        </GridColor>
        <GridImage item xs={12} md={12} lg={7} xl={6.6} paddingBottom={3}>
          <GetImage ref={ref} src={slide?.image} setHeight={setHeight} />
        </GridImage>
        <GridColor
          item
          xs={12}
          md={12}
          lg={2.65}
          xl={2.9}
          padding={1.5}
          sx={{
            maxHeight: height,
            overflowY: "auto",
          }}
        >
          <Typography variant="h3" color="white">
            Notifications
          </Typography>
          <Rightside />
        </GridColor>
      </Grid>
    </StyledBox>
  );
};

const GetImage = forwardRef(({ src, setHeight }, ref) => (
  <ImageStyled
    ref={ref}
    src={src}
    sx={{
      transition: "opacity .5s ease-in-out",
      maxHeight: "100%",
    }}
    onLoad={(e) => {
      setHeight(e.target.clientHeight);
    }}
  />
));

export default BannerCarousel;

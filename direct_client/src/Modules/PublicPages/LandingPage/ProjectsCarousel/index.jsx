import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ProjectCard from "./projectcard";
import { SwiperSlide } from "swiper/react";
import {
  SectionContainer,
  SwiperContainer,
  Skeletons,
  SkeletonsUI,
} from "@common/UI";
import SearchIcon from "@mui/icons-material/Search";
const ProjectsCarousel = ({ projectData = [], loading }) => {
  const toShow = projectData?.length > 5 ? 3 : projectData?.length > 3 ? 2 : 1;

  const ProjectsGrid = styled(Grid)(({ theme }) => ({
    rowGap: "3rem",
  }));
  const newLocal = "translateX(120px)";
  const GridSwiperWrapper = styled(Grid)(({ theme }) => ({
    transform: "translateX(0px)",
    [theme.breakpoints.up("lg")]: {
      transform: toShow >= 3 ? newLocal : "translateX(30px)",
    },
  }));
  const BGColor = styled("div")(({ theme }) => ({
    background: theme.palette.bg.greenDark,
  }));

  const SwiperSlideStyled = styled(SwiperSlide)(({ theme }) => ({
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

  const ProjectBtn = styled(Button)(({ theme }) => ({
    color: "white",
    borderRadius: "7px",
    border: "1px solid white",
    "&:hover": {
      color: "white",
      borderRadius: "7px",
      border: "1px solid white",
    },
  }));
  const SearchFieldProject = styled(TextField)(({ theme }) => ({
    backgroundColor: "#fff",
    border: "1px solid #EEE",
    borderRadius: "7px",
    outline: "none",
    outlineColor: "#EEE",
    "&:hover": {
      backgroundColor: "#fff",
      border: "1px solid #EEE",
      borderRadius: "7px",
      // outline: "none",
    },
    "fieldset.MuiOutlinedInput-notchedOutline.css-1d3z3hw-MuiOutlinedInput-notchedOutline":
      {
        border: "none",
      },
  }));

  return (
    <BGColor>
      <SectionContainer>
        <ProjectsGrid
          container
          gap={3.5}
          paddingY={"1rem"}
          alignItems={"center"}
          position={"relative"}
          justifyContent={"space-between"}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            sx={{
              width: "360px",
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <SkeletonsUI
                variant={"rounded"}
                sx={{ flex: 0.9, height: 400 }}
              />
            ) : (
              <Stack
                sx={{ height: "100%" }}
                justifyContent={"center"}
                gap={"1rem"}
                color={"white"}
                textAlign={"justify"}
                fontSize={"1.1rem"}
              >
                <Typography variant="h2" color={"white"}>
                  Projects
                </Typography>
                <Grid container rowGap={2} columnGap={1}>
                  <Grid item xs={12}>
                    <SearchFieldProject
                      id="filled-start-adornment"
                      variant={"outlined"}
                      fullWidth
                      size="small"
                      placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ProjectBtn fullWidth variant={"outlined"}>
                      Call For Proposal
                    </ProjectBtn>
                  </Grid>
                  <Grid item xs={12} sm={5.9} md={5.93} lg={5.8} xl={5.85}>
                    <ProjectBtn fullWidth variant="outlined">
                      ON GOING
                    </ProjectBtn>
                  </Grid>
                  <Grid item xs={12} sm={5.9} md={5.93} lg={5.8} xl={5.85}>
                    <ProjectBtn fullWidth variant="outlined">
                      COMPLETED
                    </ProjectBtn>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Grid>
          {loading ? (
            <GridSwiperWrapper item xs={12} sm={12} md={12} lg={8.6} xl={8.7}>
              <Stack
                direction={"row"}
                alignItems={"flex-start"}
                gap={1}
                justifyContent={"space-between"}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeletons
                    key={i}
                    sx={{
                      flex: 1,
                      height: "465px",
                      width: "360px",
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Stack>
            </GridSwiperWrapper>
          ) : projectData?.length < 3 ? (
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8.5} key={1}>
              <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                gap={1}
              >
                {projectData?.map((e, i) => (
                  <Grid
                    key={i}
                    item
                    xs={12}
                    sm={projectData.length < 2 ? 7 : 5.9}
                    md={projectData.length < 2 ? 12 : 5.9}
                    lg={projectData.length < 2 ? 8 : 5.9}
                    xl={projectData.length < 2 ? 9 : 5.9}
                  >
                    <ProjectCard data={e} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : (
            <GridSwiperWrapper item xs={12} sm={12} md={12} lg={8.6} xl={8.7}>
              <SwiperContainer
                Modules={["autoplay", "mousewheel", "navigation"]}
                loop
                className="projectsSwiper"
                breakpoints={{
                  100: {
                    slidesPerView: 1,
                  },

                  700: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1100: {
                    slidesPerView: toShow,
                    spaceBetween: 20,
                  },
                  1199: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1360: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1700: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {projectData?.map((e, i) => {
                  return (
                    <SwiperSlideStyled key={i}>
                      <ProjectCard data={e} />
                    </SwiperSlideStyled>
                  );
                })}
              </SwiperContainer>
            </GridSwiperWrapper>
          )}
        </ProjectsGrid>
      </SectionContainer>
    </BGColor>
  );
};

export default ProjectsCarousel;

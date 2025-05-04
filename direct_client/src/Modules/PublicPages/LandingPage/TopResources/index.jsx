import { Grid, Typography, styled } from "@mui/material";
import ResourceCard from "./ResourceCard.jsx";
import { Factory } from "@mui/icons-material";
import { SwiperSlide } from "swiper/react";
import KeepMountedModal from "@common/Modal";
import { useState } from "react";
import { SwiperContainer, SectionContainer } from "@common/UI";
import { data } from "./data.jsx";
const TopResources = () => {
  const [open, setopen] = useState(false);

  const SVG = styled("svg")(({ theme }) => ({
    height: "80px",
    margin: "auto",
    width: "80px",
    background: theme.palette.bg.greenGradient,
    color: "white",
    borderRadius: "50%",
    padding: ".8rem",
    boxSizing: "border-box",
  }));

  const IMG = styled("img")(({ theme }) => ({
    height: "70px",
    margin: "auto",
    width: "70px",
    background: theme.palette.bg.greenGradient,
    borderRadius: "50%",
    boxSizing: "border-box",
    objectFit: "cover",
  }));

  const object = {
    icon: (
      <SVG>
        <Factory />
      </SVG>
    ),
    label: "Bio Medical Engineering",
  };
  const arra = data;

  const GridItemPadd = styled(Grid)(({ theme }) => ({
    width: "100%",
    position: "relative",
    padding: "0",

    [theme.breakpoints.up("sm")]: {
      padding: "2rem 3rem 0rem 3rem",
    },
    [theme.breakpoints.up("md")]: {
      padding: "2rem 5rem 0rem 5rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "2rem 10rem 0rem 10rem",
    },
  }));

  return (
    <SectionContainer>
      <Grid justifyContent={"center"} container>
        <Grid item>
          <Typography variant="h1" textAlign={"center"} marginBottom={"2rem"}>
            Top Resources
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            maxWidth={"600px"}
            marginBottom={"0rem"}
            paddingX={".5rem"}
          >
            Our Top Companies Services
          </Typography>
        </Grid>
        <GridItemPadd item xs={12}>
          <SwiperContainer
            slidesPerView={3}
            style={{ justifyContent: "center", paddingBottom: "20px" }}
            Modules={["pagination", "autoplay"]}
            breakpoints={{
              200: {
                slidesPerView: 1,
                autoplay: {
                  pauseOnMouseEnter: true,
                },
              },

              786: {
                slidesPerView: 2,
                autoplay: {
                  pauseOnMouseEnter: true,
                },
              },
              1024: {
                slidesPerView: 3,
                autoplay: {
                  pauseOnMouseEnter: true,
                },
              },
              1524: {
                slidesPerView: 4,
                autoplay: {
                  pauseOnMouseEnter: true,
                },
              },
            }}
          >
            {arra.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <ResourceCard data={e} setopen={setopen} />
                </SwiperSlide>
              );
            })}
          </SwiperContainer>
        </GridItemPadd>

        <KeepMountedModal open={open} handleClose={() => setopen(false)} />
      </Grid>
    </SectionContainer>
  );
};

export default TopResources;

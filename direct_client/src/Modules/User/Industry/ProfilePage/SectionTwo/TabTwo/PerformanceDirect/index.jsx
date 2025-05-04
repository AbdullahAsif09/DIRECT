import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ViewWeek } from "@mui/icons-material";
import { data } from "./Data";
import ProjectCard from "../../../../../../PublicPages/LandingPage/ProjectsCarousel/projectcard";
function PerformanceDirect({ profileData }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h3">Performance in DIRECT Portal</Typography>
          <Button startIcon={<ViewWeek />} variant="outlined" color="success">
            View More
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {profileData.length ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            style={{ paddingBlock: "40px", paddingInline: "50px" }}
            spaceBetween={50}
            //   slidesPerView={3}
            navigation
            //   loop
            autoplay={true}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log()}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              100: {
                slidesPerView: 1,
              },
              1000: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1360: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {/* use ProjectCards over here when integrating API */}
            {data?.map((e, i) => (
              <SwiperSlide key={i}>
                <ProjectCard data={e} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography
            textAlign={"center"}
            sx={{ m: 6 }}
            variant="h1"
            color={"lightgray"}
          >
            No Data Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default PerformanceDirect;

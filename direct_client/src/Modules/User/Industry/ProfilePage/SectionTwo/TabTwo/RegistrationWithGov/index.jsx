import ProfileEstablishmentCards from "@common/CardsMui/ProfileEstablishmentCards";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function RegistrationWithGov({ profileData }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3">
          Registration With Government Establishments
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
          {profileData.map((e, i) => (
            <SwiperSlide>
              <ProfileEstablishmentCards profileData={e} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      {/* <ProfileEstablishmentCards /> */}
    </Grid>
  );
}

export default RegistrationWithGov;

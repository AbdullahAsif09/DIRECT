import { SwiperSlide } from "swiper/react";
import FlipCardComponent from "./TechnologyCard";
import { SwiperContainer } from "@common/UI";
import { useGetItems } from "./items";

const SwiperGrid = () => {
  const ITEMS = useGetItems();

  return (
    <SwiperContainer
      Modules={["grid", "autoplay", "navigation"]}
      slidesPerView={3}
      // loop
      breakpoints={{
        200: {
          slidesPerView: 1,
          grid: { rows: 3, fill: "row" },
          autoplay: {
            pauseOnMouseEnter: true,
          },
        },

        786: {
          slidesPerView: 2,
          grid: { rows: 3, fill: "row" },
          autoplay: {
            pauseOnMouseEnter: true,
          },
        },
        1024: {
          slidesPerView: 3,
          grid: { rows: 3, fill: "row" },
          autoplay: {
            pauseOnMouseEnter: true,
          },
        },
      }}
    >
      {ITEMS?.map((e, i) => {
        return (
          <SwiperSlide key={i} style={{ marginBlock: "1rem", padding: "0" }}>
            <FlipCardComponent data={e} index={i} />
          </SwiperSlide>
        );
      })}
    </SwiperContainer>
  );
};

export default SwiperGrid;

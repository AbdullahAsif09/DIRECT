import { styled } from "@mui/material";
import {
  Autoplay,
  Navigation,
  Grid,
  Pagination,
  Mousewheel,
} from "swiper/modules";
import { Swiper } from "swiper/react";

const breakpointsdefault = {
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
};
export const SwiperContainer = ({
  children,
  breakpoints,
  Modules = ["autoplay"],
  slidesPerView = 3,
  loop = false,
  style,
  className = undefined,
  maxWidth,
}) => {
  const isGrid = Modules?.includes("grid");
  const isNavigation = Modules?.includes("navigation");
  const isAutoplay = Modules?.includes("autoplay");
  const isPagination = Modules?.includes("pagination");
  const isMousewheel = Modules?.includes("mousewheel");
  const SwiperModules = [];
  if (isGrid) SwiperModules.push(Grid);
  if (isNavigation) SwiperModules.push(Navigation);
  if (isAutoplay) SwiperModules.push(Autoplay);
  if (isPagination) SwiperModules.push(Pagination);
  if (isMousewheel) SwiperModules.push(Mousewheel);
  const SwiperContainerStyled = styled(Swiper)((data) => {
    return {
      maxWidth: maxWidth ? "unset" : "1300px",
    };
  });
  const autoplay = isAutoplay
    ? {
        delay: 5500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    : false;
  const grid = isGrid
    ? {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    : false;
  const pagination = isPagination
    ? {
        clickable: true,
      }
    : false;

  return (
    <SwiperContainerStyled
      className={className}
      slidesPerView={slidesPerView}
      grid={grid}
      navigation={isNavigation}
      autoplay={autoplay}
      modules={SwiperModules}
      mousewheel={isMousewheel}
      pagination={pagination}
      loop={loop}
      style={style ? style : undefined}
      breakpoints={breakpoints ? breakpoints : breakpointsdefault}
    >
      {children}
    </SwiperContainerStyled>
  );
};

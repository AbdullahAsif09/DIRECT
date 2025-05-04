import React from "react";
import { Fade } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AnimatedOutlet = () => {
  return (
    <Fade
      in={true}
      timeout={350}
      easing={{ enter: "ease-in", exit: "ease-out" }}
    >
      <div>
        <Outlet />
      </div>
    </Fade>
  );
};

export default AnimatedOutlet;

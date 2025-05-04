import React, { useState, useEffect } from "react";
export function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth ?? 0);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowWidth;
}

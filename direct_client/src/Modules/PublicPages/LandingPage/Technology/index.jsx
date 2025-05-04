import React, { Fragment } from "react";
import MapComponentWrapper from "../MapComponent";
import TechnologyGrid from "./TechnologyGrid";
const Technology = () => {
  return (
    <Fragment>
      <TechnologyGrid />
      <MapComponentWrapper />
    </Fragment>
  );
};

export default Technology;

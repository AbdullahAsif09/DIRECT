import React, { useEffect } from "react";
import MapComponentWrapper from "./MapComponent";
// import Banner from "./Banner/Banner.jsx";
import Banner from "./Banner";
import Stats from "./Stats";
import ProjectsCarousel from "./ProjectsCarousel";

// import TopResources from "./TopResources";
import NewsEvent from "./News&Event";
import { Helmet } from "react-helmet";
import { landingMeta } from "@utils/seocontent";
import { useDispatch } from "react-redux";
import { setProfile } from "@store/Features/QalamSlice";
import MissionAndVision from "./MissionAndStatement";
import { useAxios } from "@hooks";

const LandingPage = () => {
  // const dispatch = useDispatch();
  // let uniqueMap = new Map();
  // const { data } = useAxios("qalam/profiles");
  // const { data: data2 } = useAxios("qalam/projects");
  // const qalam_profiles = data?.ric_expert_portal_faculty_cards_json_data;
  // if (qalam_profiles) {
  //   dispatch(setProfile(qalam_profiles));
  // }

  // if (data2?.ric_expert_portal_project_json_data) {
  //   data2.ric_expert_portal_project_json_data.map((e, i) => {
  //     if (e.project_type) {
  //       if (!uniqueMap.has(e.project_type)) {
  //         uniqueMap.set(e.project_type, e);
  //       }
  //     }
  //   });
  // }

  return (
    <div>
      <Helmet>
        <title>{landingMeta?.title}</title>
        <meta name="description" content={landingMeta?.description} />
      </Helmet>
      <Banner />
      {/* <MissionAndVision /> */}
      {/* <Stats /> */}
      {/* <TechnologyGrid /> */}
      {/* <MapComponentWrapper /> */}
      {/* <TopResources /> */}
      {/* <NewsEvent /> */}
    </div>
  );
};

export default LandingPage;

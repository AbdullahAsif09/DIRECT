import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "./LandingPage";

import Layout from "./Layout";

import ProjectDetails from "./ProjectDetails";
import Objective from "./About/Objective";
import Authentication from "../Authentication";
import MissionAndVision from "./LandingPage/MissionAndStatement";
import Technology from "./LandingPage/Technology";
import { ErrorContentAtCenterOfView } from "@common/UI";
import Projects from "./Projects";
import NotificationsPage from "./LandingPage/Announcements";
import NotificationDetail from "./LandingPage/Announcements/DetailPage";
const PublicPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<LandingPage />} />
        <Route index path="/missionvision" element={<MissionAndVision />} />
        <Route index path="/technology" element={<Technology />} />
        <Route index path="/projects" element={<Projects />} />
        <Route path="/project/:status/:name/:id" element={<ProjectDetails />} />
        <Route index path="/about" element={<Objective />} />
        <Route index path="/announcements" element={<NotificationsPage />} />
        <Route path="/announcement/:id" element={<NotificationDetail />} />
        <Route
          path="*"
          element={
            <ErrorContentAtCenterOfView
              code={404}
              message="Resource Not Found!"
            />
          }
        />{" "}
      </Route>
      <Route index path="/*" element={<Authentication />} />
    </Routes>
  );
};

export default PublicPages;

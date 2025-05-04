import { Navigate, Route, Routes } from "react-router-dom";

import { NavigationList, userMenuList } from "./data";
import { ProjectDetail } from "@common/Project";

import Layout from "@common/Layout";
import UploadUSR from "./UploadUSR";
import Projects from "./Projects";
import ReviewFeedback from "./ReviewFeedback";
import ViewProposals from "./ViewProposals";
import Dashboard from "../../FundingAgency/Dashboard";
import Proposals from "./Proposals";
import ViewMilestone from "@common/ViewMilestone";
import { ErrorContentAtCenterOfView } from "@common/UI";
import withAuth from "../authenticator";
import Reviewer from "../../Reviewer";
import RoleAuth from "@common/roleAuth";
import React from "react";
// import RoleAuth from "@common/roleAuth";
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
// const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
function User() {
  const AuthenticatedLayout = withAuth(Layout);
  const AuthenticatedProjects = withAuth(Projects);
  const AuthenticatedUploadUSR = withAuth(UploadUSR);
  const AuthenticatedProposals = withAuth(Proposals);
  const AuthenticatedViewProposals = withAuth(ViewProposals);
  const AuthenticatedReviewFeedback = withAuth(ReviewFeedback);
  const AuthenticatedViewMilestone = withAuth(ViewMilestone);
  const AuthenticatedDashboard = withAuth(Dashboard);
  const AuthenticatedReviewer = withAuth(Reviewer);
  const AuthenticatedProjectDetail = withAuth(ProjectDetail);
  const AuthenticatedDirectRoom = withAuth(DirectRoom);

  return (
    <Routes>
      <Route path="/" element={<RoleAuth />}>
        <Route
          path="/"
          element={
            <AuthenticatedLayout
              activeAs={"USER"}
              list={NavigationList}
              menuList={userMenuList}
            />
          }
        >
          <Route
            path="/"
            element={<Navigate to={"/user/projects"} replace />}
          />
          <Route path="/projects" element={<AuthenticatedProjects />} />
          <Route path="/uploadusr" element={<AuthenticatedUploadUSR />} />
          {/* <Route path="/project/:name/:id" element={<ProjectDetail />} /> */}
          <Route
            path="/project/:id/propsals"
            element={<AuthenticatedProposals />}
          />
          <Route
            path="/viewproposal/:id"
            element={<AuthenticatedViewProposals />}
          />
          <Route
            path="/reviewfeedback/:id"
            element={<AuthenticatedReviewFeedback />}
          />
          <Route
            path="/viewmilestone/:id"
            element={<AuthenticatedViewMilestone />}
          />
          <Route
            path="/project/dashboard"
            element={<AuthenticatedDashboard />}
          />
          <Route path="/reviewer/*" element={<AuthenticatedReviewer />} />
          <Route
            path="/projectdetails/:id"
            element={<AuthenticatedProjectDetail />}
          />
          <Route path="/directrooms/*" element={<AuthenticatedDirectRoom />} />

          <Route path="*" element={<ErrorContentAtCenterOfView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default User;

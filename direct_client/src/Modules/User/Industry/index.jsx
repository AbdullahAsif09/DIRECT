import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Layout from "@common/Layout";
const ComingSoon = React.lazy(() => import("@common/ComingSoon"));
const Projects = React.lazy(() => import("../../CommonPages/Projects"));
const ProjectDetails = React.lazy(() => import("@common/ProjectDetails"));
const ProfilePage = React.lazy(() => import("./ProfilePage"));
const ViewProposals = React.lazy(() => import("./ViewProposals"));
const AddProposal = React.lazy(() => import("../components/AddProposal"));
const Reviewer = React.lazy(() => import("../../Reviewer"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const ProjectManagement = React.lazy(() => import("./Projects"));
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
import { AcceptedProposals, ProjectDetail } from "@common/Project";
import { Helmet } from "react-helmet";
import { landingMeta } from "../../../utils/seocontent";
import ViewMilestone from "../components/ViewMilestone";
import Proposals from "../components/Proposals";
import { industryMenuList, NavigationList } from "./data";
import CreateProfile from "./CreateProfile";
import withAuth from "../authenticator";
import RoleAuth from "@common/roleAuth";
import { ErrorContentAtCenterOfView } from "@common/UI";
import EditProposal from "../components/EditProposal";
import { AcceptProposals } from "@common/Project/AcceptProposals";

const IndustryModule = () => {
  const AuthenticatedProjects = withAuth(Projects);
  const AuthenticatedReviewer = withAuth(Reviewer);
  const AuthenticatedProposals = withAuth(Proposals);
  const AuthenticatedDashboard = withAuth(Dashboard);
  const AuthenticatedProfilePage = withAuth(ProfilePage);
  const AuthenticatedCreateProfile = withAuth(CreateProfile);
  const AuthenticatedViewProposals = withAuth(ViewProposals);
  const AuthenticatedAddProposal = withAuth(AddProposal);
  const AuthenticatedEditProposal = withAuth(EditProposal);
  const AuthenticatedProjectManagement = withAuth(ProjectManagement);
  const AuthenticatedAcceptProposals = withAuth(AcceptProposals);
  const AuthenticatedViewMilestone = withAuth(ViewMilestone);
  const AuthenticatedProjectDetails = withAuth(ProjectDetails);
  const AuthenticatedProjectDetail = withAuth(ProjectDetail);
  const AuthenticatedDirectRoom = withAuth(DirectRoom);

  return (
    <>
      <Helmet>
        <title>{landingMeta?.title}</title>
        <meta name="description" content={landingMeta?.description} />
      </Helmet>
      <Routes>
        <Route path="/" element={<RoleAuth profileRole />}>
          <Route
            path="/"
            element={
              <Layout
                activeAs="INDUSTRY"
                list={NavigationList}
                menuList={industryMenuList}
              />
            }
          >
            <Route
              index
              element={<Navigate to="/user/industry/projects" replace />}
            />
            <Route path="/projects" element={<AuthenticatedProjects />} />
            <Route path="/reviewer/*" element={<AuthenticatedReviewer />} />
            <Route path="/proposals" element={<AuthenticatedProposals />} />
            <Route path="/dashboard" element={<AuthenticatedDashboard />} />
            <Route path="/profile" element={<AuthenticatedProfilePage />} />

            <Route
              path="/viewproposals"
              element={<AuthenticatedViewProposals />}
            />
            <Route
              path="/addproposal/:id"
              element={<AuthenticatedAddProposal />}
            />
            <Route
              path="/editproposal/:id"
              element={<AuthenticatedEditProposal />}
            />
            <Route
              path="/projectmgt"
              element={<AuthenticatedProjectManagement />}
            />

            <Route
              path="/projectstarted"
              element={<AuthenticatedAcceptProposals />}
            />
            <Route
              path="/viewmilestone/:id"
              element={<AuthenticatedViewMilestone />}
            />
            <Route
              path="/projectdetails/:id"
              element={<AuthenticatedProjectDetails />}
            />
            <Route
              path="/project-detail/:id"
              element={<AuthenticatedProjectDetail />}
            />
            <Route
              path="/editprofile"
              element={<AuthenticatedCreateProfile />}
            />
            <Route
              path="/directrooms/*"
              element={<AuthenticatedDirectRoom />}
            />

            <Route
              path="*"
              element={
                <ErrorContentAtCenterOfView
                  code={404}
                  message="Resource Not Found!"
                />
              }
            />
          </Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="/createprofile"
            element={<AuthenticatedCreateProfile />}
          />
        </Route>
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
};

export default IndustryModule;

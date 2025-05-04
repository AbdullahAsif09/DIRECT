import React from "react";
import Layout from "@common/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { academiaMenuList, NavigationList } from "./data";
import withAuth from "../authenticator";
import RoleAuth from "@common/roleAuth";
import { ErrorContentAtCenterOfView } from "@common/UI";
import { AcceptProposals } from "@common/Project/AcceptProposals";
const Projects = React.lazy(() => import("../../CommonPages/Projects"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const ProjectManagement = React.lazy(() => import("./Projects"));
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
const Proposals = React.lazy(() => import("../components/Proposals"));
const ViewProposals = React.lazy(() => import("./ViewProposals"));
const AddProposal = React.lazy(() => import("../components/AddProposal"));
const ProjectDetails = React.lazy(() => import("@common/ProjectDetails"));
const Profile = React.lazy(() => import("./Profile"));
const Reviewer = React.lazy(() => import("../../Reviewer"));
const CreateProfile = React.lazy(() => import("./CreateProfile"));
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
import EditProposal from "../components/EditProposal";
function AcademiaModule() {
  const AuthenticatedProfile = withAuth(Profile);
  const AuthenticatedProjects = withAuth(Projects);
  const AuthenticatedProposals = withAuth(Proposals);
  const AuthenticatedDashboard = withAuth(Dashboard);
  const AuthenticatedAddProposal = withAuth(AddProposal);
  const AuthenticatedViewProposals = withAuth(ViewProposals);
  const AuthenticatedProjectManagement = withAuth(ProjectManagement);
  const AuthenticatedProjectDetail = withAuth(ProjectDetail);
  const AuthenticatedCreateProfile = withAuth(CreateProfile);
  const AuthenticatedProjectDetails = withAuth(ProjectDetails);
  const AuthenticatedEditProposal = withAuth(EditProposal);
  const AuthenticatedReviewer = withAuth(Reviewer);
  const AuthenticatedDirectRoom = withAuth(DirectRoom);
  const AuthenticatedAcceptProposals = withAuth(AcceptProposals);

  return (
    <Routes>
      <Route path="/" element={<RoleAuth profileRole />}>
        <Route
          path="/"
          element={
            <Layout
              activeAs="ACADEMIA"
              list={NavigationList}
              menuList={academiaMenuList}
            />
          }
        >
          <Route
            path="/"
            element={<Navigate to={"/user/academia/projects"} replace />}
          />
          <Route path="/projects" element={<AuthenticatedProjects />} />
          <Route
            path="/projectstarted"
            element={<AuthenticatedAcceptProposals />}
          />
          <Route path="/proposals" element={<AuthenticatedProposals />} />
          <Route
            path="/editproposal/:id"
            element={<AuthenticatedEditProposal />}
          />
          <Route path="/dashboard" element={<AuthenticatedDashboard />} />
          <Route path="/profile" element={<AuthenticatedProfile />} />
          <Route
            path="/addproposal/:id"
            element={<AuthenticatedAddProposal />}
          />
          <Route
            path="/viewproposals"
            element={<AuthenticatedViewProposals />}
          />
          <Route
            path="/projectmgt"
            element={<AuthenticatedProjectManagement />}
          />
          <Route
            path="/project-detail"
            element={<AuthenticatedProjectDetail />}
          />

          <Route
            path="/projectdetails/:id"
            element={<AuthenticatedProjectDetails />}
          />
          <Route path="/directrooms/*" element={<AuthenticatedDirectRoom />} />

          <Route path="/reviewer/*" element={<AuthenticatedReviewer />} />
          <Route path="/editprofile" element={<AuthenticatedCreateProfile />} />
          <Route
            path="*"
            element={
              <ErrorContentAtCenterOfView
                code={404}
                message="Resource Not Found!"
              />
            }
          />

          <Route />
        </Route>
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="/createprofile" element={<AuthenticatedCreateProfile />} />
      </Route>
    </Routes>
  );
}

export default AcademiaModule;

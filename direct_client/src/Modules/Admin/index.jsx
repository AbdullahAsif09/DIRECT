import {
  adminAgencyMenuList,
  navigationList,
  pmnavigationList,
} from "./data.jsx";
import ProjectManagement from "@common/Admin/ProjectManagement/index.jsx";
import { ErrorContentAtCenterOfView } from "@common/UI/index.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import RoleAuth from "@common/roleAuth/index.jsx";
import withAuth from "./Authenticator/index.jsx";
import LayoutCommon from "@common/Layout";
import { useSelector } from "react-redux";
import React, { lazy } from "react";

const OrganizationsDetail = React.lazy(() =>
  import("./Organizations/OrganizationDetail.jsx")
);
const RequirementsFromUser = React.lazy(() => import("./RequirementsFromUser"));
const ProjectsAnalytics = React.lazy(() => import("./ProjectsAnalytics"));
const ProjectDetails = React.lazy(() => import("@common/ProjectDetails"));
const ViewMilestone = React.lazy(() => import("@common/ViewMilestone"));
const ReviewFeedback = React.lazy(() => import("./ReviewFeedback"));
const MilestonesList = React.lazy(() => import("./MilestonesList"));
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
const Organizations = React.lazy(() => import("./Organizations"));
const ViewProposals = React.lazy(() => import("./ViewProposals"));
const Announcements = React.lazy(() => import("./Announcements"));
const ProposalList = React.lazy(() => import("./ProposalList"));
const ViewLists = React.lazy(() => import("./MilestonesList"));
const PublishReq = React.lazy(() => import("./PublishReq"));
const Reviewer = React.lazy(() => import("../Reviewer"));
const Department = lazy(() => import("./Departments"));
const Project = React.lazy(() => import("./Project"));
const Login = React.lazy(() => import("./Login"));
const Teams = React.lazy(() => import("./Teams"));
const Otp = React.lazy(() => import("./OTP"));

function AdminWrapper() {
  const AuthenticatedProjectsAnalytics = withAuth(ProjectsAnalytics);
  const AuthRequirementsFromUser = withAuth(RequirementsFromUser);
  const AuthProjectManagement = withAuth(ProjectManagement);
  const AuthenticatedDirectRoom = withAuth(DirectRoom);
  const AuthMilestonesList = withAuth(MilestonesList);
  const AuthReviewFeedback = withAuth(ReviewFeedback);
  const AuthProjectDetails = withAuth(ProjectDetails);
  const AuthViewMilestone = withAuth(ViewMilestone);
  const AuthViewProposals = withAuth(ViewProposals);
  const AuthenticatedReviewer = withAuth(Reviewer);
  const AuthLayoutCommon = withAuth(LayoutCommon);
  const AuthProposalList = withAuth(ProposalList);
  const AuthPublishReq = withAuth(PublishReq);
  const AuthViewLists = withAuth(ViewLists);
  const AuthProject = withAuth(Project);
  const AuthTeams = withAuth(Teams);
  const AuthSignin = withAuth(Login);
  const AuthOtp = withAuth(Otp);

  const profile = useSelector((state) => state.profile.profile);
  let list = profile?.role?.[0] == "super" ? navigationList : pmnavigationList;
  let role = String(profile?.role?.[0]).toUpperCase();
  if (role === "SUPER") {
    role = "SUPER ADMIN";
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={"/directportal/dashboard"} replace />}
      />

      <Route path="/" element={<RoleAuth />}>
        <Route
          path="/dashboard"
          element={
            <AuthLayoutCommon
              activeAs={role}
              list={list}
              menuList={adminAgencyMenuList}
            />
          }
        >
          <Route index element={<AuthProject />} />
          <Route
            path="/dashboard/viewproposal/:id"
            element={<AuthViewProposals />}
          />
          <Route path="/dashboard/organizations" element={<Organizations />} />
          <Route path="/dashboard/department/:id" element={<Department />} />
          <Route path="/dashboard/announcements" element={<Announcements />} />
          <Route
            path="/dashboard/organization/:id"
            element={<OrganizationsDetail />}
          />
          <Route
            path="/dashboard/projectdetails/:id"
            element={<AuthProjectDetails />}
          />
          <Route path="/dashboard/management" element={<AuthViewLists />} />
          <Route
            path="/dashboard/milestone/:id"
            element={<AuthViewMilestone />}
          />
          <Route
            path="/dashboard/reviewfeedback/:id"
            element={<AuthReviewFeedback />}
          />
          <Route
            path="/dashboard/proposallist/:id"
            element={<AuthProposalList />}
          />
          {/* update api */}
          <Route
            path="/dashboard/reviewer/*"
            element={<AuthenticatedReviewer />}
          />
          <Route
            path="/dashboard/milestoneslist/:id"
            element={<AuthMilestonesList />}
          />
          <Route
            path="/dashboard/projectmanagement/:id"
            element={<AuthProjectManagement />}
          />
          <Route
            path="/dashboard/directrooms"
            element={<AuthenticatedDirectRoom isAdmin />}
          />
          {role === "SUPER ADMIN" ? (
            <>
              <Route path="/dashboard/teams" element={<AuthTeams />} />
              <Route
                path="/dashboard/requirements"
                element={<AuthRequirementsFromUser />}
              />
              <Route path="/dashboard/edit/:id" element={<AuthPublishReq />} />
              <Route
                path="/dashboard/publishrequirements/:id"
                element={<AuthPublishReq />}
              />
            </>
          ) : null}
          {/* {role === "PROJECTMANAGER" ? ( */}
          <>
            <Route
              path="/dashboard/analytics"
              element={<AuthenticatedProjectsAnalytics />}
            />
          </>
          {/* ) : null} */}
        </Route>
      </Route>
      <Route path="/admin/login" element={<AuthSignin />} />
      <Route path="/admin/resetpassword" element={<AuthOtp />} />
      <Route path="*" element={<ErrorContentAtCenterOfView />} />
    </Routes>
  );
}

export default AdminWrapper;

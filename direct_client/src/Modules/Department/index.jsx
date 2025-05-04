import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@common/Layout";
import LoginDepartment from "./Login";
import { useSelector } from "react-redux";
import { roles } from "@constants/index";
import { NavigationList, userMenuList } from "./data";
import { ErrorContentAtCenterOfView } from "@common/UI";

const Dashboard = lazy(() => import("./Dashboard"));
const Team = lazy(() => import("./Team"));
const Projects = lazy(() => import("./Projects"));
const MilestonesList = lazy(() => import("./ProjectMangment/MilestonesList"));
const ProjectManagement = lazy(() => import("./ProjectMangment/ProjectManagement"));
const ViewMilestone = lazy(() => import("./ProjectMangment/ViewMilestone/index"));

const Department = () => {
  const profile = useSelector((state) => state.profile?.profile);
  const isValidUser = roles.department.some((departmentRole) =>
    profile?.role.includes(departmentRole)
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isValidUser ? (
            <Layout
              list={NavigationList}
              menuList={userMenuList}
              activeAs={profile?.role?.[0] ?? "Department Admin"}
            />
          ) : (
            <Navigate to={"/department/login"} replace />
          )
        }
      >
        <Route path="/" element={<Navigate to={"/department/dashboard"} replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/team" element={<Team />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/projectmangent/:id" element={<MilestonesList />} />
        <Route path="/dashboard/projectmangent/:id/:milestones" element={<ProjectManagement />} />
        <Route path="/dashboard/projectmangent/:pid/milestone/:id" element={<ViewMilestone />} />
        <Route path="*" element={<ErrorContentAtCenterOfView />} />
      </Route>

      <Route
        path="/login"
        element={isValidUser ? <Navigate to={"/department/dashboard"} /> : <LoginDepartment />}
      />
      <Route path="*" element={<ErrorContentAtCenterOfView />} />
    </Routes>
  );
};

export default Department;

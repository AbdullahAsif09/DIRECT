import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
const Dashboard = React.lazy(() => import("./Dashbaord"));
const Departments = React.lazy(() => import("./Departments"));
const Layout = React.lazy(() => import("@common/Layout"));
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
const Login = React.lazy(() => import("./Login"));
import { ErrorContentAtCenterOfView } from "@common/UI";
import ProjectManagement from "@common/Admin/ProjectManagement";
import CompareMilestone from "@common/ViewMilestone";
import { NavigationList } from "./data";
import Projects from "./Projects";
import Organization from "./Organization";
import { roles } from "@constants/index";
import { useSelector } from "react-redux";
const Exective = () => {
  const profile = useSelector((state) => state.profile?.profile);
  const isValidRole = roles.executive.find((role) => profile?.role.includes(role));

  return (
    <Routes>
      <Route
        path="/"
        element={isValidRole ? <Outlet /> : <Navigate to={"/executive/dashboard/login"} />}
      >
        <Route path="/" element={<Layout list={NavigationList} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organization/:id" element={<Organization />} />
          <Route path="/department/:id" element={<Departments />} />
          <Route path="/projects/:id" element={<Projects />} />
          <Route path="/milestone/:id" element={<CompareMilestone />} />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/projectmanagement/:id" element={<ProjectManagement />} />
        </Route>
      </Route>
      <Route
        path="/dashboard/login"
        element={!isValidRole ? <Login /> : <Navigate to={"/executive"} />}
      />
      <Route
        path="*"
        element={<ErrorContentAtCenterOfView code={404} message="Resource Not Found!" />}
      />
    </Routes>
  );
};

export default Exective;

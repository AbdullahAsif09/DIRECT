import Layout from "@common/Layout";
import React, { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MenuList, NavigationList } from "./data";
import RoleAuth from "@common/roleAuth";
import Otp from "./OTP";
import LoginOrganization from "./Login";
import { ErrorContentAtCenterOfView } from "@common/UI";
import { useSelector } from "react-redux";
import { roles } from "@constants/index";

const Dashboard = lazy(() => import("./Dashboard"));
const Department = lazy(() => import("./Department"));

const Organization = () => {
  const profile = useSelector((state) => state.profile?.profile);
  const isValidUser = roles.organization.some((organizationRole) =>
    profile?.role.includes(organizationRole)
  );
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to={"/organization/dashboard"} />}
      />
      <Route
        path="/"
        element={
          isValidUser ? (
            <Layout
              list={NavigationList}
              menuList={MenuList}
              activeAs={profile?.role?.[0] ?? "Organization Admin"}
            />
          ) : (
            <Navigate to={"/organization/dashboard/login"} replace />
          )
        }
      >
        <Route path="/" element={<RoleAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/department/:id" element={<Department />} />
          <Route path="*" element={<ErrorContentAtCenterOfView />} />
        </Route>
      </Route>
      <Route
        path="/"
        element={
          isValidUser ? (
            <Navigate replace to={"/organization/dashboard"} />
          ) : (
            <Outlet />
          )
        }
      >
        <Route path="/login" element={<LoginOrganization />} />
        <Route path="/resetpassword" element={<Otp />} />
      </Route>
      <Route path="*" element={<ErrorContentAtCenterOfView />} />
    </Routes>
  );
};

export default Organization;

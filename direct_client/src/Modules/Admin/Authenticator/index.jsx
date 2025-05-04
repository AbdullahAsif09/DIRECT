import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return function Authorized(props) {
    const profile = useSelector((state) => state.profile.profile);
    const { pathname } = useLocation();

    const isAdmin = pathname.includes("directportal");
    const authRoutes = [
      "/directportal/admin/login",
      "/directportal/admin/resetpassword",
    ];
    const isAuthenticated = () => {
      const token = profile?._id;
      const find = authRoutes.find((route) => pathname.includes(route));
      const url = !token ? (find ? find : "/directportal/admin/login") : null;
      const condition = isAdmin && token;
      return { url, condition };
    };

    const authStatus = isAuthenticated();

    return authStatus.condition ? (
      <WrappedComponent {...props} />
    ) : pathname.includes(authStatus.url) ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to={authStatus.url} replace />
    );
  };
};

export default withAuth;

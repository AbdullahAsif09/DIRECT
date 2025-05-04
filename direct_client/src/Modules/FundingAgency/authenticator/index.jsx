import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const withAuth = (WrappedComponent) => {
  return function Authorized(props) {
    const profile = useSelector((state) => state.profile.profile);
    const location = useLocation();
    const { pathname } = location;

    const isfundingagency = pathname.includes("fundingagency");

    const isAuthenticated = () => {
      const isProfileComplete = isfundingagency;
      const condition = isProfileComplete && profile?._id;
      const url = !profile?._id
        ? "/fundingagency/login"
        : condition
        ? "/fundingagency/projects"
        : null;

      return { condition, url };
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

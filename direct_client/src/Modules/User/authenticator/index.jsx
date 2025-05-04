import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const withAuth = (WrappedComponent) => {
  return function Authorized(props) {
    const profile = useSelector((state) => state.profile.profile);
    const location = useLocation();
    const { pathname } = location;

    const isAcademia = pathname.includes("academia");
    const isIndustry = pathname.includes("industry");

    const isAuthenticated = () => {
      // Determine profile completeness based on role
      const isProfileComplete = isAcademia
        ? profile?.academia?.profileComplete
        : isIndustry
        ? profile?.industry?.profileComplete
        : profile?._id;

      // Check if the user is authenticated and their profile is complete
      const condition = Boolean(isProfileComplete && profile?._id);

      // Determine the redirect URL based on authentication status and role
      const url = !profile?._id
        ? "/login"
        : condition
        ? null
        : isAcademia
        ? "/user/academia/createprofile"
        : "/user/industry/createprofile";

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

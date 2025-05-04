import React from "react";
import {
  useAxios,
  useCrypto,
  useGetModuleName,
  useGetPathnameModule,
  useGetRole,
} from "@hooks/index";
import { Error, Spinner } from "../UI";
import AnimatedOutlet from "../AnimationMui/Outlet";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoleAuth = ({ profileRole }) => {
  const pRole = useGetRole();
  const mRole = useGetPathnameModule();
  const mrole = useGetModuleName();

  const role = profileRole ? pRole : mRole;

  const profile = useSelector((state) => state.profile.profile);
  if (mrole === "academia" || mrole === "industry") {
    if (profile && Object.keys(profile).length > 0 && !profile?.[role]?.profileComplete) {
      return <Navigate to={`/user/${mrole}/createprofile`} replace />;
    }
  }

  const navigateRoutesAuth = {
    academia: "/login",
    industry: "/login",
    user: "/login",
    admin: "/directportal/admin/login",
    organization: "/organization/login",
    organizationAdmin: "/organization/login",
    useragency: "/useragency/login",
    fundingagency: "/fundingagency/login",
  };

  const { encryption } = useCrypto();
  const { pathname } = useLocation();

  const obj = {
    userId: profile?._id,
    role,
    date: new Date(),
  };
  if (profile?.[role]) {
    obj["subProfile"] = {
      userId: profile?.[role]?._id,
      role: role,
    };
  }

  const encryptedData = encryption(obj, profile?._id);
  const url = "auth/validateRole";

  const toSend = { data: encryptedData };

  const { data, error, loading } = useAxios(url, "POST", toSend);

  if (loading) {
    return <Spinner message={"Validating user role..."} isLoading={true} />;
  } else if (error) {
    return <Error error={error} />;
  } else if (data?.type === "success") {
    return <AnimatedOutlet />;
  } else if (data?.type === "failure") {
    return <Navigate to={navigateRoutesAuth[role]} state={{ url: pathname }} />;
  }
};

export default RoleAuth;

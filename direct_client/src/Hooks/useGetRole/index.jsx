import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const useGetRole = () => {
  const { pathname } = useLocation();
  const profile = useSelector((state) => state.profile.profile);
  const role = profile?.role?.[0];

  const arr = [
    "super",
    "subadmin",
    "projectManager",
    "webAdmin",
    "technicalEvaluator",
  ];
  // if (!token) return null;

  if (role === "users" && role == "users") {
    if (pathname.includes("academia")) return "academia";
    else if (pathname.includes("industry")) return "industry";
    return "user";
  } else if (role == "userAgency") return "userAgency";
  else if (role == "fundingAgency") return "fundingAgency";
  else if (role == "executive") return "executive";
  else if (role == "organizationAdmin") return "organizationAdmin";
  else if (role == "departmentProjectManager")
    return "departmentProjectManager";
  else if (role == "departmentAdmin") return "departmentAdmin";
  else if (arr.includes(role)) return "admin";
};

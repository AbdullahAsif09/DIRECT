import { useLocation } from "react-router-dom";

export const useGetPathnameModule = () => {
  const { pathname } = useLocation();

  const isIndustry = pathname.includes("/user/industry");
  const isAcademia = pathname.includes("/user/academia");
  const isUserAgency = pathname.includes("/useragency");
  const isFundingAgency = pathname.includes("/fundingagency");
  const isAdmin = pathname.includes("/directportal");
  const isUser =
    pathname.includes("/user") && !isAcademia && !isFundingAgency && !isIndustry && !isUserAgency && !isAdmin;
  const isOrganization = pathname.startsWith("/organization");

  // if (!token) return null;
  if (isUser) return "user";
  else if (isUserAgency) return "userAgency";
  else if (isFundingAgency) return "FundingAgency";
  else if (isAdmin) return "admin";
  else if (isOrganization) return "organizationAdmin";
};
export const useGetModuleName = () => {
  const { pathname } = useLocation();

  const isIndustry = pathname.includes("/user/industry");
  const isAcademia = pathname.includes("/user/academia");
  const isUserAgency = pathname.includes("/useragency");
  const isFundingAgency = pathname.includes("/fundingagency");
  const isAdmin = pathname.includes("/directportal");
  const isOrganization = pathname.startsWith("/organization");
  const isUser =
    pathname.includes("/user") &&
    !isAcademia &&
    !isFundingAgency &&
    !isIndustry &&
    !isUserAgency &&
    !isAdmin &&
    !isOrganization;

  // if (!token) return null;
  if (isUser) return "user";
  else if (isAcademia) return "academia";
  else if (isIndustry) return "industry";
  else if (isUserAgency) return "userAgency";
  else if (isFundingAgency) return "fundingAgency";
  else if (isAdmin) return "admin";
  else if (isOrganization) return "organizationAdmin";
};

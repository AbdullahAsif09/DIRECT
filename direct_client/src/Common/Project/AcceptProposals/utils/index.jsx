import { useLocation } from "react-router-dom";

export const useUtils = () => {
  const { pathname } = useLocation();
  /* check if url is industry */
  const IsIndustry = pathname.includes("industry");
  /* check if url is industry */
  const IsAcademia = pathname.includes("academia");

  /* get redirectVariable */
  const redirectUrl = IsAcademia ? "academia" : IsIndustry ? "industry" : null;
  return { redirectUrl };
};

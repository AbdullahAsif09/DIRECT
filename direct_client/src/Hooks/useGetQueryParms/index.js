import { useLocation, useParams } from "react-router-dom";

export const useGetQueryParam = (toSearch) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { milestones, ...rest } = useParams();

  return milestones ?? queryParams.get(toSearch) ?? rest[toSearch];
};

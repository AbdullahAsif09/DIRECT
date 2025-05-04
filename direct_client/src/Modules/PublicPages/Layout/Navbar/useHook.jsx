import { useState } from "react";
import { useGetRole } from "@hooks";

export const useNav = () => {
  const [open, setopen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // drop down menu
  const r = useGetRole();
  const role = String(r)?.toLowerCase() ?? "user";

  const getProfileLink = () => {
    return `/${
      role === "admin"
        ? "directportal"
        : role?.startsWith("organization")
        ? "organization"
        : role?.startsWith("department")
        ? "department"
        : "user"
    }`;
  };

  return { getProfileLink, open, setopen, setAnchorEl, anchorEl };
};

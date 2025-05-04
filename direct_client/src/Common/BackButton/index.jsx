import React from "react";
import { TransparentButton } from "../UI/ButtonsUI";
import { useNavigate } from "react-router-dom";
import { useGetPathnameModule, useGetRole } from "@hooks/index";

const BackButton = ({ message }) => {
  const navigate = useNavigate();
  const autRole = useGetRole();
  const unAuthRole = useGetPathnameModule();
  const role = autRole || unAuthRole;
  const user =
    role === "user" ||
    role === "academia" ||
    role === "industry" ||
    role === "executive";
  const admin = role === "admin";
  const executive = role === "executive";

  const unAuthArray = ["Unauthorized", "Token expired"];

  return (
    <TransparentButton
      onClick={() => {
        if (!unAuthArray.includes(message)) navigate(-1, { replace: true });
        else {
          const newuser = `/login`;
          const newadmin = `/directportal/admin/login`;
          const newexecutive = `/executive/dashboard/login`;
          const url = `/${role?.toLowerCase(0)}/login`;
          navigate(
            user ? newuser : admin ? newadmin : executive ? newexecutive : url,
            {
              replace: true,
              state: { from: window.location.pathname },
            }
          );
        }
      }}
    >
      {!unAuthArray.includes(message) ? "Go Back" : "Login"}
    </TransparentButton>
  );
};

export default BackButton;

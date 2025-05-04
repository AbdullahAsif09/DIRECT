import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  FANavigationList,
  fundingAgencyMenuList,
  mapperFiles,
  mapperProjects,
  mapperSocketProjects,
} from "./data";
import {
  setPastFiles,
  setProjects,
  updateProjects,
} from "@store/Features/fundingAgency";
import { ProjectDetail } from "@common/Project";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "@hooks";
import Dashboard from "./Dashboard";
const Layout = React.lazy(() => import("../../Common/Layout"));
const LoginCommon = React.lazy(() => import("../CommonPages/LoginCommon"));
const SignupCommon = React.lazy(() => import("../CommonPages/SignupCommon"));
const RoleAuth = React.lazy(() => import("@common/roleAuth"));

/* user pages */
const Projects = React.lazy(() => import("./Projects"));
const UploadUSR = React.lazy(() => import("./UploadUSR"));
const Propsals = React.lazy(() => import("./Proposals"));
const ViewPropsals = React.lazy(() => import("./ViewProposals"));
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
import withAuth from "./authenticator";
import Reviewer from "@modules/Reviewer";
function FundingAgency() {
  const AuthenticatedDirectRoom = withAuth(DirectRoom);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket?.socket);
  const profile = useSelector((state) => state.profile?.profile);
  const { data } = useAxios("fundingAgency/getProjects", "POST", {
    id: profile?._id,
  });
  const {
    data: d,
    loading: l,
    error: e,
  } = useAxios("fundingAgency/getfiles", "POST", {});

  const handleNewProjectsOfSockets = (newProject) => {
    let flag = false;
    data?.data?.map((e) => {
      if (e._id === newProject._id) {
        flag = true;
      }
    });
    if (flag === true) return;
    const restructureProject = mapperSocketProjects(newProject, data);
    dispatch(updateProjects(restructureProject));
  };

  useEffect(() => {
    if (data) {
      dispatch(setProjects(mapperProjects(data)));
    } else if (d) {
      dispatch(setPastFiles(mapperFiles(d)));
    }
    if (!socket) return;
    socket?.on("newProjectForFundingAgency", handleNewProjectsOfSockets);
    return () => {
      socket?.off("newProjectForFundingAgency", handleNewProjectsOfSockets);
    };
  }, [data, d]);

  return (
    <Routes>
      <Route path="/login" element={<LoginCommon />} />
      <Route path="/signup" element={<SignupCommon />} />
      <Route path="/" element={<RoleAuth />}>
        <Route
          path="/"
          element={
            <Layout
              activeAs="FUNDING AGENCY"
              list={FANavigationList}
              menuList={fundingAgencyMenuList}
            />
          }
        >
          <Route
            path="/"
            element={<Navigate to={"/fundingagency/projects"} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/uploadusr" element={<UploadUSR />} />
          <Route path="/project/:id/propsals" element={<Propsals />} />
          <Route path="/project/dashboard" element={<Dashboard />} />
          <Route path="/reviewer/*" element={<Reviewer />} />
          <Route path="/directrooms/*" element={<AuthenticatedDirectRoom />} />

          <Route
            path="/project/:pid/propsals/viewproposal/:id"
            element={<ViewPropsals />}
          />
          <Route path="/projectdetails/:id" element={<ProjectDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default FundingAgency;

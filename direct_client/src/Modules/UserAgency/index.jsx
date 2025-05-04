import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  mapperFiles,
  mapperProjects,
  mapperSocketProjects,
  userAgencyMenuList,
  userAgencyNavigationList,
} from "./data";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "@hooks";
import { ProjectDetail } from "@common/Project";
import {
  setPastFiles,
  setProjects,
  updateProjects,
} from "@store/Features/userAgency";
import withAuth from "./authenticator";
const Layout = React.lazy(() => import("@common/Layout"));
const RoleAuth = React.lazy(() => import("@common/roleAuth"));
const LoginCommon = React.lazy(() => import("../CommonPages/LoginCommon"));
const SignupCommon = React.lazy(() => import("../CommonPages/SignupCommon"));

/* user pages */
const Projects = React.lazy(() => import("./Projects"));
const UploadUSR = React.lazy(() => import("./UploadUSR"));
const Propsals = React.lazy(() => import("./Proposals"));
const ViewPropsals = React.lazy(() => import("./ViewProposals"));
const DirectRoom = React.lazy(() => import("@common/DirectRooms"));
const Reviewer = React.lazy(() => import("../Reviewer"));

function UserAgency() {
  const AuthenticatedDirectRoom = withAuth(DirectRoom);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket?.socket);
  const profile = useSelector((state) => state.profile?.profile);
  const { data } = useAxios("userAgency/getProjects", "POST", {
    id: profile?._id,
  });
  const {
    data: d,
    loading: l,
    error: e,
  } = useAxios("userAgency/getfiles", "GET");
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
    socket?.on("newProjectForUserAgency", handleNewProjectsOfSockets);
    return () => {
      socket?.off("newProjectForUserAgency", handleNewProjectsOfSockets);
    };
  }, [data, d]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginCommon />} />
        <Route path="/signup" element={<SignupCommon />} />
        <Route path="/" element={<RoleAuth />}>
          <Route
            path="/"
            element={
              <Layout
                activeAs={"USER AGENCY"}
                list={userAgencyNavigationList}
                menuList={userAgencyMenuList}
              />
            }
          >
            {/* <Route path="/dashboard" element={<Home />} /> */}

            {/* user pages */}
            <Route
              path="/"
              element={<Navigate to={"/useragency/projects"} />}
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/uploadusr" element={<UploadUSR />} />
            {/* <Route path="/project/:name/:id" element={<ProjectDetail />} /> */}
            <Route path="/project/:id/propsals" element={<Propsals />} />
            <Route path="/reviewer/*" element={<Reviewer />} />
            <Route path="/projectdetails/:id" element={<ProjectDetail />} />
            <Route
              path="/directrooms/*"
              element={<AuthenticatedDirectRoom />}
            />

            <Route
              path="/project/:id/propsals/viewproposal/:id"
              element={<ViewPropsals />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default UserAgency;

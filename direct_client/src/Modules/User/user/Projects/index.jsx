import Box from "@mui/material/Box";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useCallback, useEffect, useState } from "react";

import { keys } from "@config";
import { useAxios } from "@hooks";
import { mapperProjects, mapperSocketProjects } from "../data";
import DataGrids from "@common/TableMui/DataGrids";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ paddingBottom: 2 }}>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function AllFiles() {
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      width: 90,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "projectName",
      headerName: "Project",
      width: 400,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.value.icon} />
          <Typography sx={{ marginLeft: 1 }}>
            {params.value.name ? params.value.name : "Abdullah"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "proposals",
      headerName: "Proposals",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor:
              params.value === "Completed" ? "#4CAF50" : "#2196F3",
            color: "white",
            textAlign: "center",
            width: "100%",
          }}
        >
          {params.row?.published ? "Published" : "Not Published"}
        </Box>
      ),
    },
    {
      field: "options",
      headerName: "Proposals",
      width: 240,

      headerAlign: "center",
      align: "center",

      renderCell: (params) =>
        params.row.proposals ? (
          <Button
            component={"div"}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/user/project/${params.row._id}/propsals`);
            }}
          >
            Proposals
          </Button>
        ) : (
          <TypographyMUI>No proposal submitted yet</TypographyMUI>
        ),
    },
  ];
  // const projects = useSelector((state) => state.usr.projects) ?? [];

  const { data, loading } = useAxios("user/getProjects", "GET");

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (!socket) return;
    socket?.on("updatedProjectForUser", handleUpdatedProjectsOfSockets);
    socket?.on("newProjectForUser", handleNewProjectsOfSockets);

    return () => {
      socket?.off("updatedProjectForUser", handleUpdatedProjectsOfSockets);
      socket?.off("newProjectForUser", handleNewProjectsOfSockets);
    };
  }, []);

  useEffect(() => {
    if (!data?.data) return;
    setProjects(mapperProjects({ data: data?.data }));
  }, [data]);
  const handleNewProjectsOfSockets = useCallback((newProject) => {
    let flag = false;
    data?.data?.map((e) => {
      if (e._id === newProject._id) {
        flag = true;
      }
    });
    if (flag === true) return;
    const restructureProject = mapperSocketProjects(newProject, data);
    setProjects((e) => [...e, restructureProject]);
  }, []);

  const handleUpdatedProjectsOfSockets = useCallback((updatedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project?._id === updatedProject?._id) {
        return {
          ...project,
          published: updatedProject?.published,
          proposals: updatedProject?.proposalsAmount,
          projectName: {
            name: updatedProject.title,
            icon: keys.rootserver + updatedProject?.image?.[0],
          },
          id: project.id,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  }, []);

  return (
    <DataGrids
      title={"Projects"}
      loading={loading}
      dataRow={projects}
      dataColumn={columns}
      toolBarGrid={CustomToolbar}
    />
  );
}

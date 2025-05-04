import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useSelector } from "react-redux";
import { useAxios } from "@hooks";

function data() {
  const socket = useSelector((state) => state.socket.socket);
  const profile = useSelector((state) => state.profile.profile);
  const { api } = useAxios();
  const [AgencyProjects, setAgencyProjects] = useState([]);

  const fetchFundignAgencyProjects = async () => {
    try {
      const data = await api({
        url: "projects/getProjectsForFundingAgency",
        method: "post",
        object: {
          id: profile?._id,
        },
      });

      if (data?.result === 200) {
        setAgencyProjects(
          data?.result?.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProjects = (data) => {
    if (!data?.fundingAgency.includes(profile?._id)) return;
    setAgencyProjects((prev) => {
      const existingItem = prev?.find((item) => item?._id === data?._id);

      if (existingItem) {
        return prev?.map((item) => {
          if (item?._id === data?._id) {
            return { ...data, id: item?.id };
          }
          return item;
        });
      } else {
        return [...prev, { ...data, id: prev?.length + 1 }];
      }
    });
  };

  useEffect(() => {
    fetchFundignAgencyProjects();
    socket?.on("watchProjectChange", handleChangeProjects);
    return () => {
      socket?.off("watchProjectChange");
    };
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Project Name",
      width: 300,
    },
    {
      field: "published",
      headerName: "Published",
      width: 250,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row?.published ? "Published" : "Not Published"}
            sx={{
              backgroundColor: (theme) =>
                params.row?.published
                  ? theme.palette.bg.parrotGreen
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing1",
      headerName: "Call For Proposal",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Submission Of Proposals" ||
              params.row?.ongoing === "Pre-award Formalities" ||
              params.row?.ongoing === "Awarded" ||
              params.row?.ongoing === "Contracted" ||
              params.row?.ongoing === "Project In Progress" ||
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Call For Proposal"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Submission Of Proposals" ||
                params.row?.ongoing === "Pre-award Formalities" ||
                params.row?.ongoing === "Awarded" ||
                params.row?.ongoing === "Contracted" ||
                params.row?.ongoing === "Project In Progress" ||
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Call For Proposal"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing2",
      headerName: "Submission Of Proposals",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Pre-award Formalities" ||
              params.row?.ongoing === "Awarded" ||
              params.row?.ongoing === "Contracted" ||
              params.row?.ongoing === "Project In Progress" ||
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Submission Of Proposals"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Pre-award Formalities" ||
                params.row?.ongoing === "Awarded" ||
                params.row?.ongoing === "Contracted" ||
                params.row?.ongoing === "Project In Progress" ||
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Submission Of Proposals"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing3",
      headerName: "Pre-award Formalities",
      type: "number",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Awarded" ||
              params.row?.ongoing === "Contracted" ||
              params.row?.ongoing === "Project In Progress" ||
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Pre-award Formalities"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Awarded" ||
                params.row?.ongoing === "Contracted" ||
                params.row?.ongoing === "Project In Progress" ||
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Pre-award Formalities"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing4",
      headerName: "Awarded",
      type: "number",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Contracted" ||
              params.row?.ongoing === "Project In Progress" ||
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Awarded"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Contracted" ||
                params.row?.ongoing === "Project In Progress" ||
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Awarded"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing5",
      headerName: "Contracted",
      type: "number",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Project In Progress" ||
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Contracted"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Project In Progress" ||
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Contracted"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing6",
      headerName: "Project In Progress",
      type: "number",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Project Completed" ||
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Project In Progress"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Project Completed" ||
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Project In Progress"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "ongoing7",
      headerName: "Project Completed",
      type: "number",
      width: 200,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row?.ongoing === "Done"
                ? "completed"
                : params.row?.ongoing === "Call For Proposal"
                ? "ongoing"
                : "Not Started"
            }
            sx={{
              backgroundColor: (theme) =>
                params.row?.ongoing === "Done"
                  ? theme.palette.bg.parrotGreen
                  : params.row?.ongoing === "Project Completed"
                  ? theme.palette.bg.vibrantBlue
                  : theme.palette.bg.fadedPink,
              color: "white",
            }}
          />
        );
      },
    },
    {
      field: "fullName4",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <ButtonMui variant={"contained"}>View</ButtonMui>;
      },
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Throwable Ball Camera",
      useragency: "Rapidev",
      firstName1: "Jon",
      firstName2: "Jon",
      firstName3: "Jon",
      age: 35,
      aged: 35,
    },
  ];
  return { columns, rows, AgencyProjects };
}

export default data;

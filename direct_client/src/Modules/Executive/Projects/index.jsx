import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TaskCards from "./TaskCards";
import { useAxios } from "@hooks/index";
import { useSelector } from "react-redux";
import BackButton from "@common/BackButton";
import ModalMui from "@common/ModalMui";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import InputFields from "@common/InputFields/InputFields";
import ButtonMui from "@common/MUI/ButtonMUI";
import ProjectComments from "@common/Admin/ProjectComments";
import { useParams } from "react-router-dom";

const Projects = () => {
  const { id: departmentId } = useParams();
  const socket = useSelector((state) => state?.socket?.socket);
  const { data: dataGetProjects } = useAxios(`executive/getProjects/${departmentId}`);
  const [openModal, setOpenModal] = useState(false);
  const [ProjectsData, setProjectsData] = useState([]);
  const handleOpenModal = (e) => setOpenModal(e);
  const handleCloseModal = () => setOpenModal(null);
  useEffect(() => {
    setProjectsData(dataGetProjects?.result);
  }, [dataGetProjects]);
  useEffect(() => {
    socket?.on("newProjectForAdmin", (data) => {
      setProjectsData((prev) => [...prev, data]);
    });
    return () => {
      socket?.off("updateTotalProjects");
    };
  }, []);
  return (
    <Grid marginTop={"30px"} pb={1}>
      <Grid container width={"100%"} justifyContent={"end"} py={1} alignItems="center">
        <Grid item xs={12}>
          <BackButton message={"back to Home"} />
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0DA678",
                  },
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  label="Filter"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0DA678",
                    },
                  }}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="new">New Project</MenuItem>
                  <MenuItem value="old">Old Project</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        {ProjectsData?.map((project, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} justifyContent={"stretch"}>
            <TaskCards handleOpenModal={handleOpenModal} key={index} dataCard={project} />
          </Grid>
        ))}
      </Grid>
      {openModal && (
        <ModalMui
          width={"80vw"}
          height={"95vh"}
          top={"50%"}
          left={"50%"}
          openModalMui={Boolean(openModal)}
          handleCloseModalMui={handleCloseModal}
          content={<ProjectComments project={openModal} handleCloseModal={handleCloseModal} />}
        />
      )}
    </Grid>
  );
};

export default Projects;

function ModalContent() {
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <MainHeadings text={"Comments"} variant={"h2"} />
      </Grid>
      <Grid item xs={12}>
        <InputFields type={"textbox"} rows={4} />
      </Grid>
      <Grid item xs={12}>
        <ButtonMui variant={"contained"} color={"success"}>
          Submit
        </ButtonMui>
      </Grid>
    </Grid>
  );
}

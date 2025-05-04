import { useEffect, useState } from "react";
import { SpinnerSmaller, TabsCommon } from "../../UI";
import AllTabs from "./AllTabs";
import { Grid, Stack } from "@mui/material";
import { useFetchAllPosts } from "./AllTabs/apiCall";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./AllTabs/Filters";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks/index";
const TabData = [
  "Call for Proposals",
  "Submission of Technical and Financial Proposals",
  "Pre-Award Formalities",
  "Awarded",
  "Contracted",
  "Projects in Progress",
  "Projects Completed",
];
function All() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [Tabs, setTabs] = useState(0);
  const socket = useSelector((state) => state.socket?.socket);
  const handleChangeTabs = (newValue, v) => {
    setTabs(v ?? newValue);
  };
  const [loading, setLoading] = useState(false);
  const [classifiedProjectDetails, setClassifiedProjectDetails] = useState([]);
  const [unClassifiedProjectDetails, setUnClassifiedProjectDetails] = useState([]);
  const { api } = useAxios();
  const handleDeleteProject = async (id, type) => {
    if (!type || (type !== "classified" && type !== "nonclassified")) {
      return dispatch(setAlert({ text: "Invalid Type selection.", status: "error" }));
    }

    setLoading("deleting project");
    try {
      const response = await api({
        url: `projects/deleteproject`,
        method: "post",
        object: {
          id,
          classified: type === "classified",
          published: true,
        },
      });
      if (response?.type === "success") {
        if (type === "classified") {
          setClassifiedProjectDetails(response?.result);
        } else {
          setUnClassifiedProjectDetails(response?.result);
        }
        dispatch({
          status: "success",
          text: "Project deleted successfully.",
        });
      } else {
        dispatch(
          setAlert({
            text: response?.result ?? response?.data?.message,
            status: "error",
          })
        );
      }
      setLoading(false);
      console.log(response, "response");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [noProjectsFoundClassified, setNoProjectsFoundClassified] = useState(false);
  const [noProjectsFoundUnClassified, setNoProjectsFoundUnClassified] = useState(false);
  const arrayTabs = ["Non-Classified Projects", "Classified Projects"];

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleDate = (createdAt) => {
    const date = new Date(createdAt);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const daySuffix = ["th", "st", "nd", "rd"];
    const day = date.getDate();
    const formattedDate = `${day}${daySuffix[(day - 20) % 10] || daySuffix[day] || daySuffix[0]} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
    return formattedDate;
  };
  const { call } = useFetchAllPosts();
  const fetchClassified = async () => {
    try {
      setLoading(true);
      const response = await call(true);
      if (response?.message === "no projects found") {
        setNoProjectsFoundClassified(true);
      }
      if (Array.isArray(response)) {
        const RestructuredData = response?.map((item, index) => {
          const formattedDate = handleDate(item?.createdAt);
          return {
            id: index + 1,
            _id: item?._id,
            title: item?.title,
            Initiator: "Admin",
            applicationField: item?.applicationField,
            milestones: item?.milestones,
            createdAt: formattedDate,
            proposalsAmount: item?.proposalsAmount,
            description: item?.description,
            image: item?.image?.[0],
            initialProposalsChosenByAgency: item?.initialProposalsChosenByAgency,
            finalProposalsChosenByAgency: item?.finalProposalsChosenByAgency,
            fundingAgency: item?.fundingAgency?.length > 0 ? item?.fundingAgency[0]?.name : "",
            userAgency: item?.userAgency?.length > 0 ? item?.userAgency[0]?.name : "",
            usrBy: item?.usrBy?.length > 0 ? item?.usrBy[0]?.name : "",
          };
        });
        setClassifiedProjectDetails(RestructuredData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const fetchUnClassified = async () => {
    try {
      setLoading(true);
      const response = await call(false);
      if (response?.message === "no projects found") {
        setNoProjectsFoundUnClassified(true);
      }
      if (Array.isArray(response)) {
        const RestructuredData = response?.map((item, index) => {
          const formattedDate = handleDate(item?.createdAt);
          return {
            id: index + 1,
            _id: item?._id,
            title: item?.title,
            Initiator: "Admin",
            applicationField: item?.applicationField,
            createdAt: formattedDate,
            proposalsAmount: item?.proposalsAmount,
            milestones: item?.milestones,
            description: item?.description,
            image: item?.image?.[0],
            initialProposalsChosenByAgency: item?.initialProposalsChosenByAgency,
            finalProposalsChosenByAgency: item?.finalProposalsChosenByAgency,
            fundingAgency: item?.fundingAgency?.length > 0 ? item?.fundingAgency[0]?.name : "",
            userAgency: item?.userAgency?.length > 0 ? item?.userAgency[0]?.name : "",
            usrBy: item?.usrBy?.length > 0 ? item?.usrBy[0]?.account?.name : "",
          };
        });
        setUnClassifiedProjectDetails(RestructuredData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSocketNewProject = (data) => {
    const formattedDate = handleDate(data?.createdAt);
    if (data?.classified === false) {
      setUnClassifiedProjectDetails((prev) => [
        ...prev,
        {
          id: prev?.length + 1,
          _id: data?._id,
          title: data?.title,
          Initiator: "Admin",
          applicationField: data?.applicationField,
          createdAt: formattedDate,
          proposalsAmount: data?.proposalsAmount,
          description: data?.description,
          milestones: data?.milestones,
          image: data?.image?.[0],
          initialProposalsChosenByAgency: data?.initialProposalsChosenByAgency,
          finalProposalsChosenByAgency: data?.finalProposalsChosenByAgency,
          fundingAgency: data?.fundingAgency?.length > 0 ? data?.fundingAgency[0]?.name : "",
          userAgency: data?.userAgency?.length > 0 ? data?.userAgency[0]?.name : "",
          usrBy: data?.usrBy?.length > 0 ? data?.usrBy[0]?.name : "",
        },
      ]);
    }
    if (data?.classified === true) {
      setClassifiedProjectDetails((prev) => [
        ...prev,
        {
          id: prev?.length + 1,
          _id: data?._id,
          title: data?.title,
          Initiator: "Admin",
          applicationField: data?.applicationField,
          createdAt: formattedDate,
          proposalsAmount: data?.proposalsAmount,
          description: data?.description,
          milestones: data?.milestones,
          image: data?.image?.[0],
          initialProposalsChosenByAgency: data?.initialProposalsChosenByAgency,
          finalProposalsChosenByAgency: data?.finalProposalsChosenByAgency,
          fundingAgency: data?.fundingAgency?.length > 0 ? data?.fundingAgency[0]?.name : "",
          userAgency: data?.userAgency?.length > 0 ? data?.userAgency[0]?.name : "",
          usrBy: data?.usrBy?.length > 0 ? data?.usrBy[0]?.name : "",
        },
      ]);
    }
  };
  const handleSocketUpdatedProject = (data) => {
    const formattedDate = handleDate(data?.createdAt);
    if (data?.classified === false) {
      setUnClassifiedProjectDetails((prev) =>
        prev?.map((item) =>
          item?._id === data?._id
            ? {
                id: item?.id,
                _id: data?._id,
                title: data?.title,
                Initiator: "Admin",
                applicationField: data?.applicationField,
                createdAt: formattedDate,
                proposalsAmount: data?.proposalsAmount,
                description: data?.description,
                image: data?.image?.[0],
                milestones: data?.milestones,
                initialProposalsChosenByAgency: data?.initialProposalsChosenByAgency,
                finalProposalsChosenByAgency: data?.finalProposalsChosenByAgency,
                fundingAgency: data?.fundingAgency?.length > 0 ? data?.fundingAgency[0]?.name : "",
                userAgency: data?.userAgency?.length > 0 ? data?.userAgency[0]?.name : "",
                usrBy: data?.usrBy?.length > 0 ? data?.usrBy[0]?.name : "",
              }
            : item
        )
      );
    }
    if (data?.classified === true) {
      setClassifiedProjectDetails((prev) =>
        prev?.map((item) =>
          item?._id === data?._id
            ? {
                id: item?.id,
                _id: data?._id,
                title: data?.title,
                Initiator: "Admin",
                applicationField: data?.applicationField,
                createdAt: formattedDate,
                proposalsAmount: data?.proposalsAmount,
                description: data?.description,
                image: data?.image?.[0],
                milestones: data?.milestones,
                initialProposalsChosenByAgency: data?.initialProposalsChosenByAgency,
                finalProposalsChosenByAgency: data?.finalProposalsChosenByAgency,
                fundingAgency: data?.fundingAgency?.length > 0 ? data?.fundingAgency[0]?.name : "",
                userAgency: data?.userAgency?.length > 0 ? data?.userAgency[0]?.name : "",
                usrBy: data?.usrBy?.length > 0 ? data?.usrBy[0]?.name : "",
              }
            : item
        )
      );
    }
  };
  useEffect(() => {
    fetchClassified();
    fetchUnClassified();
    socket?.on("newProjectForAdmin", handleSocketNewProject);
    socket?.on("updatedProjectsAdmin", handleSocketUpdatedProject);
    return () => {
      socket?.off("newProjectForAdmin", handleSocketNewProject);
      socket?.off("updatedProjectsAdmin", handleSocketUpdatedProject);
    };
  }, []);
  const [filter, setFilter] = useState("");
  if (loading) {
    return (
      <SpinnerSmaller
        isLoading={true}
        message={typeof loading == "string" ? "Deleting Project Please wait..." : undefined}
      />
    );
  }
  return (
    <Grid container rowGap={3} sx={{ maxWidth: "100%" }}>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          rowGap={"1rem"}
          columnGap={"3rem"}
        >
          <TabsCommon arrayTabs={arrayTabs} handleChange={handleChangeTabs} value={Tabs} />
          <Filters filter={filter} setFilter={setFilter} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {Tabs == 0 && (
          <AllTabs
            filter={filter}
            tabContextValue={value}
            TabListCustomeHandleChange={handleChange}
            TabData={TabData}
            classified={false}
            noProjectsFound={noProjectsFoundUnClassified}
            dataProject={unClassifiedProjectDetails}
            handleDeleteProject={(e) => handleDeleteProject(e, "nonclassified")}
          />
        )}
        {Tabs == 1 && (
          <AllTabs
            filter={filter}
            tabContextValue={value}
            TabListCustomeHandleChange={handleChange}
            classified={true}
            TabData={TabData}
            noProjectsFound={noProjectsFoundClassified}
            dataProject={classifiedProjectDetails}
            handleDeleteProject={(e) => handleDeleteProject(e, "classified")}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default All;

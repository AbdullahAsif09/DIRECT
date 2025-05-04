import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import OverView from "./sections/OverView";
import Projects from "./sections/Projects";
import Departments from "./sections/Departments";
import { useAxios } from "@hooks/index";
import OrganizationName from "@common/OrganizationName";
import { useSelector } from "react-redux";

const OrganizationDetail = () => {
  const profile = useSelector((state) => state?.profile?.profile);
  const id = profile?.organization;

  const { data } = useAxios(
    `organizations/getOrganization/${id}?id=${profile?._id}`,
    "get"
  );

  const { data: organizationProjects } = useAxios(
    `organizations/getOrganizationProjects/${profile?._id}?organizationID=${id}`,
    "get"
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const arrayTabs = ["Overview", "Projects", "Departments"];
  const navigationButton = "/send-proposal";

  return (
    <Grid padding={2}>
      <Typography variant="h3" paddingBottom={2}>
        Organization Details
      </Typography>
      <OrganizationName
        value={value}
        arrayTabs={arrayTabs}
        profileData={data?.result}
        handleChange={handleChange}
        buttonContent={null}
        navigationButton={navigationButton}
        noDescription
      />

      {value === 0 && <OverView data={data?.result} />}
      {value === 1 && <Projects data={organizationProjects?.result} />}
      {value === 2 && <Departments data={data?.result} />}
    </Grid>
  );
};

export default OrganizationDetail;

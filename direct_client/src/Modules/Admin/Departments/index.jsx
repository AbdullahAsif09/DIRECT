import { Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Overview from "./sections/Overview";
import ProjectManagers from "./sections/ProjectManagers";
import { useAxios } from "@hooks/index";
import { useParams } from "react-router-dom";

const Department = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const { data: dataDepartment } = useAxios(
    `departments/getDepartmentOne?departmentID=${id}`
  );
  const { data: dataProjects } = useAxios(
    `departments/getDepartmentsProjects?id=${id}`
  );
  const { data: dataDepartmentsProjectsCount } = useAxios(
    `departments/getDepartmentsProjectsCount?id=${id}`
  );
  const { data: dataDepartmentsProjectsGraph } = useAxios(
    `departments/getDepartmentYearlyProjects?id=${id}`
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid paddingTop={2} paddingX={3}>
      <Grid xs={12} item display={"flex"} justifyContent={"end"}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab label="Project Managers" />
        </Tabs>
      </Grid>
      {value === 0 && (
        <Overview
          dataProjects={dataProjects?.result}
          dataDepartment={dataDepartment?.result}
          dataDepartmentsProjectsCount={dataDepartmentsProjectsCount?.result}
          dataDepartmentsProjectsGraph={dataDepartmentsProjectsGraph?.result}
        />
      )}
      {value === 1 && <ProjectManagers />}
    </Grid>
  );
};

export default Department;

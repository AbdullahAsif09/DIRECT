import { Grid } from "@mui/material";
import Overview from "./Overview";
import { useAxios } from "@hooks/index";
import { useSelector } from "react-redux";

const Department = () => {
  const profile = useSelector((state) => state.profile?.profile);
  const id = profile?.department;
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

  return (
    <Grid paddingTop={2} paddingX={3}>
      <Overview
        dataProjects={dataProjects?.result}
        dataDepartment={dataDepartment?.result}
        dataDepartmentsProjectsCount={dataDepartmentsProjectsCount?.result}
        dataDepartmentsProjectsGraph={dataDepartmentsProjectsGraph?.result}
      />
    </Grid>
  );
};

export default Department;

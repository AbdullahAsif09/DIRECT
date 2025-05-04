import { Grid } from "@mui/material";
import MainPageIntro from "@common/Admin/MainPageIntro";
import { TabsCommon } from "@common/UI";
import { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { Stack } from "@mui/system";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TableWithCardAndHeading from "@common/Admin/TableWithCardAndHeading";
import {
  AccountBalanceRounded,
  ApartmentRounded,
  Group,
  Person,
} from "@mui/icons-material";
import data from "./data";
import AddTeamMembers from "./addTeamMembers";

function Teams() {
  const {
    columnsAdmin,
    AdminData,
    AcademiaData,
    columnsUsers,
    IndustryData,
    UserAgencyData,
    FundingAgencyData,
    columnsAgency,
    r_columns,
    fetchAdmins,
  } = data();
  const [Tabs, setTabs] = useState(0);
  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };

  return (
    <Grid container sx={{ pt: 6, pb: 2 }} gap={4}>
      <Grid item xs={12}>
        <MainPageIntro
          title={"Teams"}
          description={
            "Team Management and Roles Overview - Explore the functionalities for adding new memebers for management team and assigning roles to users, crucial for efficient project collaboration"
          }
        />
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center">
        <AddTeamMembers fetchAdmins={fetchAdmins} />
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <>
            <TableWithCardAndHeading
              dataGridCol={r_columns}
              dataGridRow={AdminData ?? []}
              headingText={"Team Members"}
              iconHeading={<GroupsIcon sx={{ color: "bg.darkBlue" }} />}
            />
          </>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Teams;

// dropdown component

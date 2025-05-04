import { Grid } from "@mui/material";
import React from "react";
import MembersHeader from "./Header/Header";
import SubAdminCard from "./Cards/Card";
import { useAxios } from "@hooks";

const Members = ({ id }) => {
  // Array of dummy data

  const { data, loading } = useAxios(`projects/getmembers?id=${id}`);

  const mapped = data?.result?.map((member) => {
    return {
      adminPic: "https://randomuser.me/api/portraits/men/46.jpg",
      adminName: member?.name
        ? member?.name
        : member?.firstName + " " + member?.lastName,
      adminRole: member?.model,
    };
  });

  return (
    <Grid container pb={5} pt={3}>
      <MembersHeader />
      <Grid container spacing={2}>
        {mapped?.map((admin, index) => (
          <SubAdminCard
            key={index}
            adminPic={admin.adminPic}
            adminName={admin.adminName}
            adminRole={admin.adminRole}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Members;

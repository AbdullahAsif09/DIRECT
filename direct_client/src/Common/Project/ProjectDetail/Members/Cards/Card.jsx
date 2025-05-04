import React from "react";
import { Card, Grid, Typography, Avatar } from "@mui/material";

const SubAdminCard = ({ adminPic, adminName, adminRole, tasks }) => {
  return (
    <Grid item xs={12} lg={3} md={6} marginTop={5}>
      <Card
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "36px 16px",
        }}
      >
        <Avatar
          // src={adminPic}
          sx={{ width: 90, height: 90, marginBottom: 2 }}
        />
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {adminName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 2 }}
        >
          {adminRole}
        </Typography>
      </Card>
    </Grid>
  );
};

export default SubAdminCard;

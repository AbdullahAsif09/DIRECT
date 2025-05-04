import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";

const StatsCardWrapper = styled(Box)(({ theme }) => ({
  padding: "20px 15px",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  minWidth: "200px",
  flex: "1",
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",

}));

const StatsCard = ({ icon, title, value, change }) => {
  return (
    <StatsCardWrapper>
      <CardHeader>
        <Typography variant="body2">{title}</Typography>
        <img src={icon} alt={`${title} icon`} />
      </CardHeader>

      <Typography variant="h4">{value}</Typography>
      <Grid container  marginTop={"7px"}>
        {/* <Typography variant="body2" color={change > 0 ? "green" : "red"}>
          {change > 0 ? `+${change}%` : `${change}%`}
        </Typography> */}
        {/* <Typography variant="body2" marginLeft={"5px"}>since last month</Typography> */}
      </Grid>
    </StatsCardWrapper>
  );
};

export default StatsCard;

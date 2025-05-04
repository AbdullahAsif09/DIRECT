import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const DashCard = ({ data }) => {
  return (
    <>
      <Grid item xs={12} lg={4} md={6}>
        <Card
          sx={{
            boxShadow:" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
          }}
        >
          <CardContent sx={{ padding: "15px 10px" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h5">{data.title}</Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {data.amount}
              </Typography>
            </Grid>
            <Grid container alignItems="center" mb={1}>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={"14px"}
                sx={{ color: "green", marginRight: "8px" }}
              >
                {data.total}
              </Typography>
              <Typography fontSize={"12px"}>{data.line1}:</Typography>
            </Grid>
            <Grid container alignItems="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={"14px"}
                sx={{ color: "green", marginRight: "8px" }}
              >
                {data.completed}
              </Typography>
              <Typography fontSize={"12px"}>{data.line2}:</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default DashCard;

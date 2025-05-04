import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const TopCard = ({ data }) => {
  return (
    <>
      <Grid item xs={12} lg={4} md={6} >
        <Card
        
          sx={{
            boxShadow:" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "8px",
            padding:'5px',
          }}
          
        >
          <CardContent sx={{ padding: "5px 10px" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h5">{data.name}</Typography>
              <Avatar src={data.icon} alt="icon image" variant="saqure"  sx={{
                 
                }} />
           
            </Grid>
            <Grid container  alignItems="center" >
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={"20px"}
                color={"#464646"}
               
              >
                {data.title}
              </Typography>
              <Typography
             
                fontSize={"14px"}
                marginTop={"5px"}
                marginLeft={"5px"}
              
               
              >
                {data.discription}
              </Typography>
              
            </Grid>
            
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TopCard;

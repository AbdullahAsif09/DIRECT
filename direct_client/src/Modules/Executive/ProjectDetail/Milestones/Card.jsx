// Card.js
import { Avatar, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import cardData from "./data";

const Card = () => {
  return (
    <Grid container  marginTop={2} justifyContent={'center'}   >
      {cardData.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={12}
          md={6}
          lg={3.8}
          margin={1}
          borderRadius={"10px"}
          boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={2}
          >
            <Typography variant="body2" fontWeight={"bold"}>
              {item.title}
            </Typography>
            <Box
              sx={{
                background: "#0DA678",
                borderRadius: "10px",
                padding: "2px",
              }}
            >
              <Typography variant="body1" fontSize={"10px"} color={"white"}>
                {item.status}
              </Typography>
            </Box>
          </Grid>
          <Divider sx={{ marginY: 1 }} />
          <Stack padding={2} gap={2}>
            <Typography variant="body2">{item.description}</Typography>
            <Typography variant="body2">
              Due Date:{" "}
              <Box marginLeft={2} component={"span"} fontWeight={"bold"}>
                {item.dueDate}
              </Box>
            </Typography>
            <Typography variant="body2">
              Files
              <Box marginLeft={2} component={"span"} fontWeight={"bold"}>
                {item.filesCount}
              </Box>
            </Typography>
            <LinearProgress variant="determinate" value={item.progress} />
            <Stack flexDirection={"row"}>
              {item.avatars.map((avatar, index) => (
                <Avatar key={index} src={avatar} sx={{ marginLeft: index > 0 ? -1 : 0 }} />
              ))}
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Card;

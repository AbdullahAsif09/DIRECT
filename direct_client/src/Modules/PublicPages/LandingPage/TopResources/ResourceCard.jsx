import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { Stack } from "@mui/system";

const CardStyled = styled(Card)`
  background-color: #white;
  height: 100%;
  min-height: 250px;
  cursor: pointer;
  position: relative;
  max-width: 90%;
  margin: 2rem auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
`;

const ResourceCard = ({ data, setopen }) => {
  return (
    <CardStyled
      elevation={7}
      onClick={() => {
        setopen(data);
      }}
    >
      <Stack justifyContent={"center"}>{data?.img}</Stack>
      {/* <Typography
        variant="h4"
        marginTop={"2rem"}
        textAlign={"center"}
        fontWeight={"600"}
      >
        {data?.name}
      </Typography> */}
    </CardStyled>
  );
};

export default ResourceCard;

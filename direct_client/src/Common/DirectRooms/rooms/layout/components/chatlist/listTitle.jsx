import { Stack } from "@mui/material";
import React from "react";
import { PaddingBoxStyled } from "../../../styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const ListTitle = ({ title = "", sx = {}, ...rest }) => {
  return (
    <PaddingBoxStyled sx={{ py: 0 }}>
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{
          fontWeight: "550",
          fontSize: "16px",
          ...sx,
          height: 44,

          gap: ".7rem",
        }}
        {...rest}
      >
        <ArrowDropDownIcon />

        {title}
      </Stack>
    </PaddingBoxStyled>
  );
};

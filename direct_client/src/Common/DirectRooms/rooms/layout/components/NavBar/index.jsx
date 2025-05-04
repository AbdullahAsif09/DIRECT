import { LogoWrapper } from "@common/Logo";
import { PaddingBoxStyled } from "@common/DirectRooms/rooms/styled";
import { Stack } from "@mui/system";
import React from "react";
import { AvatarProfile } from "../Avatar";
import { keys } from "@config";

export const NavBar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={30}
      width={"100%"}
    >
      <PaddingBoxStyled
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontWeight: "550",
          color: "black",
        }}
      >
        <LogoWrapper height={40} width={40} style={{ margin: 0 }} />
        DIRECT COMMUNITY
      </PaddingBoxStyled>
      <PaddingBoxStyled>
        <AvatarProfile
          badge={true}
          name="aman"
          src={keys.rootserver + "asset/users/424profiledownload.jpeg"}
        />
      </PaddingBoxStyled>
    </Stack>
  );
};

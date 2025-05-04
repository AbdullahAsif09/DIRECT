import AvatarGroup from "@mui/material/AvatarGroup";
import { AvatarProfile } from "./index";
import { Box, Stack } from "@mui/material";
import { useFormattedNumber } from "@hooks/index";
import { keys } from "@config";
import { ChatContext } from "../../context";
import { useContext } from "react";

export function AvatarGroups() {
  const formattedNo = useFormattedNumber();
  const { chatInfo, usersonline = [] } = useContext(ChatContext);
  const { members = [] } = chatInfo;
  const filtered = members?.filter((e) =>
    usersonline?.find((id) => id == e?.id?._id)
  );
  return (
    <Stack direction={"row"} alignItems={"center"} gap={".8rem"}>
      <AvatarGroup spacing={4}>
        {filtered?.slice(0, 3)?.map((member, index) => {
          const { id } = member;
          const name =
            id?.account?.name ?? id?.firstName + " " + id?.lastName ?? "";
          return (
            <AvatarProfile
              badge
              key={index}
              name={name}
              src={keys.rootserver + id?.image}
            />
          );
        })}
      </AvatarGroup>
      <Box sx={{ fontWeight: 500, color: "black", fontSize: "1rem" }}>
        {/* {formattedNo(members?.length, false)} */}
      </Box>
    </Stack>
  );
}

import * as React from "react";
import { styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ChatContext } from "@common/DirectRooms/rooms/context";
import { useAxios, useCrypto } from "@hooks/index";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#522653",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

export default function CustomizedSwitches() {
  const { setChatInfo, chatInfo, chatList, setChatListData } =
    React.useContext(ChatContext);
  const { API, loading } = useAxios();
  const { encryption } = useCrypto();

  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} />}
        label={
          chatInfo?.type == "restricted"
            ? "Chat Restricted"
            : "Chat Unrestricted"
        }
        checked={chatInfo?.type == "restricted" ? true : false}
        sx={{ width: "200px" }}
        onChange={async (e) => {
          if (loading) return;
          const type = e.target.checked;

          const data = encryption({
            type: type ? "restricted" : "unrestricted",
            chatId: chatInfo?._id,
            date: new Date(),
          });
          const response = await API({
            url: "chatroom/group/updatesetting",
            method: "POST",
            object: {
              data,
            },
          });
          const chat = response?.chat;

          if (chat) {
            const list = chatList[0].list;
            const map = list.map((item) =>
              item._id === chat._id ? chat : item
            );
            setChatListData((e) => {
              return {
                ...e,
                list: map,
              };
            });
            setChatInfo(chat);
          }
        }}
        slotProps={{
          typography: {
            sx: {
              fontFamily: "var(--chatFont)",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "1.4",
            },
          },
        }}
      />
    </FormGroup>
  );
}

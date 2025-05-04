import { ListItemAvatar, ListItemText, Stack, Tooltip } from "@mui/material";
import React from "react";
import { AvatarProfile } from "../index";
import { TruncatedComponent } from "@common/MUI";
import { PaddingBoxStyled } from "../../../styled";

export const ChatName = ({ item = {}, selected }) => {
  return (
    <Tooltip
      arrow
      title={item?.name}
      placement="right-end"
      enterDelay={800}
      enterNextDelay={500}
      slotProps={{
        tooltip: {
          sx: {
            fontFamily: "var(--chatFont)",
            letterSpacing: "0.05em",
            fontWeight: 300,
            fontSize: 12,
          },
        },
      }}
    >
      <PaddingBoxStyled
        sx={{
          display: "flex",
          alignItems: "center",

          width: "100%",
          m: "auto",
          transition: "all .2s ease-in-out",
          pl: selected ? 1.2 : 0.7,
          height: 44,
          background: selected ? "var(--mainColor)" : undefined,
        }}
      >
        {item?.type === "GROUP" ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              width: 32,
              pl: 0.5,
              height: "100%",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.69518 4.03238C7.75581 3.63058 8.09488 3.33398 8.49358 3.33398C8.98867 3.33398 9.36725 3.78394 9.292 4.28287L7.50922 15.9689C7.4486 16.3707 7.10953 16.6673 6.71082 16.6673C6.21573 16.6673 5.83713 16.2174 5.91241 15.7184L7.69518 4.03238Z"
                fill={selected ? "#fde4ec" : "#4F4F4F"}
              />
              <path
                d="M12.0542 4.03238C12.1147 3.63058 12.4538 3.33398 12.8526 3.33398C13.3477 3.33398 13.7263 3.78394 13.651 4.28287L11.8682 15.9689C11.8076 16.3707 11.4685 16.6673 11.0697 16.6673C10.5747 16.6673 10.1961 16.2174 10.2714 15.7184L12.0542 4.03238Z"
                fill={selected ? "#fde4ec" : "#4F4F4F"}
              />
              <path
                d="M15.8493 6.66731C16.3007 6.66731 16.6667 7.0404 16.6667 7.50064C16.6667 7.96088 16.3007 8.33398 15.8493 8.33398H4.40705C3.95567 8.33398 3.58974 7.96088 3.58974 7.50064C3.58974 7.0404 3.95567 6.66731 4.40705 6.66731H15.8493Z"
                fill={selected ? "#fde4ec" : "#4F4F4F"}
              />
              <path
                d="M14.7596 12.2229C15.211 12.2229 15.5769 12.596 15.5769 13.0562C15.5769 13.5164 15.211 13.8896 14.7596 13.8896H3.31731C2.86593 13.8896 2.5 13.5164 2.5 13.0562C2.5 12.596 2.86593 12.2229 3.31731 12.2229H14.7596Z"
                fill={selected ? "#fde4ec" : "#4F4F4F"}
              />
            </svg>
          </Stack>
        ) : (
          <ListItemAvatar sx={{ minWidth: "unset", width: 35 }}>
            <AvatarProfile name={item?.name} />
          </ListItemAvatar>
        )}
        <ListItemText
          sx={{
            m: 0,
            height: "100%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TruncatedComponent
            Component={"span"}
            lines={1}
            sx={{
              fontSize: "15px",
              fontWeight: 400,
              letterSpacing: "-.1px",
              color: selected ? "#fde4ec" : undefined,
            }}
          >
            {item?.name}
          </TruncatedComponent>
        </ListItemText>
      </PaddingBoxStyled>
    </Tooltip>
  );
};

import { List, ListItem, ListItemButton, Paper } from "@mui/material";
import { SearchBar } from "../index";
import { Fragment, useContext, useState } from "react";
import { ListTitle } from "./listTitle";
import { ChatName } from "./chatName";
import { ChatContext } from "@common/DirectRooms/rooms/context";

export const ChatList = () => {
  const [searched, setSearched] = useState("");
  const { chatList, chatInfo, setChatInfo } = useContext(ChatContext);
  return (
    <Paper sx={{ height: "100%" }} elevation={1}>
      <SearchBar
        sx={{ height: "calc(var(--headerHeight))" }}
        setSearched={setSearched}
      />

      <List
        sx={{
          paddingBlock: 0,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          height: `calc(100% - var(--headerHeight) * 1.1)`,
        }}
      >
        {chatList?.map((mainListItem, index) => {
          return (
            <Fragment key={index}>
              <ListTitle title={mainListItem?.title} />

              {mainListItem?.list?.map((item, i) => {
                const conditionToRender =
                  searched?.trim()?.length > 0
                    ? item?.name
                        ?.toLowerCase()
                        ?.includes(searched?.toLowerCase())
                    : true;
                return (
                  conditionToRender && (
                    <ListItem
                      onClick={() => {
                        sessionStorage.setItem("chatInfo", item?._id);
                      }}
                      key={i}
                      id={i}
                      sx={{
                        p: 0,
                        mb: 0,
                        py: 0,
                        boxShadow: "0px 0px 1px rgba(0, 0, 0, .1)",
                      }}
                    >
                      <ListItemButton
                        onClick={() => setChatInfo(item)}
                        sx={{
                          p: 0,
                        }}
                        alignItems="center"
                      >
                        <ChatName
                          item={item}
                          selected={item?._id == chatInfo?._id}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                );
              })}
            </Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

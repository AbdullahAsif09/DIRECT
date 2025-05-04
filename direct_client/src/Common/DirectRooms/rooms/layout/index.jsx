import { useMediaQuery, useTheme } from "@mui/material";
import { GridMaxHeightStyled, GridMinHeightStyled, ParenGrid } from "../styled";
import { ChatList, ChatContent, NavBar } from "./components";
import { Fragment, useContext } from "react";
import { ChatContext } from "../context";

const Layout = () => {
  const theme = useTheme();
  const { chatInfo, loading } = useContext(ChatContext);
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ParenGrid container loading={`${loading}`}>
      <GridMinHeightStyled item xs={12}>
        <NavBar />
      </GridMinHeightStyled>
      {!md ? (
        <Fragment>
          <GridMaxHeightStyled
            item
            xs={12}
            md={3}
            lg={2.5}
            className="chat-list"
          >
            <ChatList />
          </GridMaxHeightStyled>
          <GridMaxHeightStyled item xs={12} md={9} lg={9.5}>
            <ChatContent />
          </GridMaxHeightStyled>
        </Fragment>
      ) : (
        <GridMaxHeightStyled item xs={12}>
          {chatInfo?.name ? (
            <ChatContent showBackButton md={md} />
          ) : (
            <ChatList />
          )}
        </GridMaxHeightStyled>
      )}
    </ParenGrid>
  );
};

export default Layout;

import * as React from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Global } from "@emotion/react";
import { ChatContext } from "@common/DirectRooms/rooms/context";
import { Divider, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DataGrids from "@common/TableMui/DataGrids";
import { useGetColumn } from "./data";
import { useCrypto, useAxios } from "@hooks/index";
import { useDispatch, useSelector } from "react-redux";
import CustomizedSwitches from "./switch";
import {
  Global_Project_Member_Request_Handler,
  Global_Project_Member_Status_Handler,
} from "@constants/index";
import { setAlert } from "@store/Features/AlertSlice";

const drawerBleeding = 56;

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  paddingLeft: 0,
}));

const Root = styled("div")(({ theme }) => ({
  height: "50%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[50]
      : theme.palette.background.default,
}));

const TabPanelCustome = styled(TabPanel)(({ theme }) => ({
  maxWidth: "100%",
  paddingTop: theme.spacing(3),
  paddingInline: theme.spacing(1),
}));
const TabsCustom = styled(TabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    background: "green !important",
    color: "green !important",
  },
  "& .Mui-selected": {
    background: "#F5F8FF",
    color: "green !important",
  },
}));
const TabCustom = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  "& .Mui-selected": {
    background: "#F5F8FF",
  },
  fontFamily: "var(--chatFont)",
}));

const tabs = ["joined", "requests"];

function SwipeableEdgeDrawer({ setClicked, clicked }) {
  const open = clicked;
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [value, setValue] = React.useState("0");
  const { chatInfo } = React.useContext(ChatContext);
  const [requestsData, setRequestData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loadingInProgress, setLoadingInProgress] = React.useState(false);
  const { profile } = useSelector((state) => state.profile);
  const { api } = useAxios();
  const { encryption } = useCrypto();

  /* remove-ban */
  const handleAPI = async (option, params) => {
    if (loadingInProgress) return;
    const encryptedData = encryption(
      {
        userId: params.row._id,
        date: new Date(),
        chatId: chatInfo?._id,
        type: option,
        action: option,
      },
      profile?._id
    );

    try {
      setLoadingInProgress(setLoadingInProgress);

      socket.emit(Global_Project_Member_Status_Handler, encryptedData);
    } catch (e) {
      dispatch(setAlert({ status: "error", text: "Error handling Request" }));
    }
  };

  /* member request action - accept, reject */
  const handlerequestAPI = async (option, params) => {
    try {
      if (loadingInProgress) return;
      setLoadingInProgress(setLoadingInProgress);
      const encryptedData = encryption(
        {
          userId: params.row._id,
          date: new Date(),
          chatId: chatInfo?._id,
          type: option,
        },
        profile?._id
      );

      socket.emit(Global_Project_Member_Request_Handler, encryptedData);
    } catch (e) {
      dispatch(setAlert({ status: "error", text: "Error handling Request" }));
    }
  };

  /* member request action response */
  React.useEffect(() => {
    socket?.on(Global_Project_Member_Request_Handler, (data) => {
      const result = data?.result;
      if (result) {
        console.log(result);

        setRequestData((prev) => {
          return { ...prev, members: result };
        });
        dispatch(
          setAlert({ status: "success", text: "Request handled successfully" })
        );
      } else {
        dispatch(setAlert({ status: "error", text: "Error handling Request" }));
      }
      setLoadingInProgress(false);
    });
    socket?.on(Global_Project_Member_Status_Handler, (data) => {
      const result = data?.result;
      if (result) {
        setData((prev) => {
          return { ...prev, members: result };
        });
        dispatch(
          setAlert({ status: "success", text: "Request handled successfully" })
        );
      } else {
        dispatch(setAlert({ status: "error", text: "Error handling Request" }));
      }
      setLoadingInProgress(false);
    });
    return () => {
      socket?.off(Global_Project_Member_Request_Handler);
      socket?.off(Global_Project_Member_Status_Handler);
      setLoadingInProgress(false);
    };
  }, []);

  const columns = useGetColumn(
    value == 0 ? handleAPI : handlerequestAPI,
    value
  );

  const handleChange = (e, v) => {
    setValue(`${v}`);
  };

  const toggleDrawer = (newOpen) => () => {
    setClicked(false);
  };

  React.useEffect(() => {
    const urlBase = `chatroom/group/${value == 0 ? "members" : "getrequests"}/${
      chatInfo?._id
    }`;
    const setter = value == 0 ? setData : setRequestData;
    if ((clicked && value === "1") || value === "0") {
      api({
        url: urlBase,
        method: "GET",
      })
        .then((e) => {
          setter(e);
        })
        .finally(() => {
          setLoadingInProgress(false);
        });
    }
  }, [clicked, value]);

  const rowToShow = value == 0 ? data : requestsData;

  const row = rowToShow?.members?.map((member) => {
    return {
      id: member?._id,
      _id: member?.id?._id,
      name:
        member?.id?.name ??
        member?.id?.account?.name ??
        member?.id?.firstName + " " + member?.id?.lastName,
      type: member?.id?.role?.[0] ?? member?.model,
      status: member?.status,
    };
  });

  return (
    <Root>
      <Global
        styles={{
          "#chat-drawer > .MuiPaper-root": {
            "--chatFont": "Poppins",
            height: `calc(90% - ${drawerBleeding}px)`,
            margin: "auto",
            width: "100%",
            overflow: "visible",
            backgroundColor: "transparent",
            bosShadow: "none",
            userSelect: clicked ? undefined : "none",
            opacity: clicked ? 1 : 0,
            fontFamily: "var(--chatFont)",
          },
          "#chat-drawer": {
            zIndex: clicked ? 1300 : -1,
          },
          ".PrivateSwipeArea-root": {
            display: "none !important",
          },
        }}
      />
      <SwipeableDrawer
        id="chat-drawer"
        container={window.document.body}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          height: "300px",

          "& .MuiPape-root": {
            // height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            height: "auto",
          }}
        >
          <Typography
            sx={{
              p: 2,
              fontWeight: 600,
              fontFamily: "var(--chatFont)",
              color: "black",
              maxWidth: "80%",
            }}
          >
            Group Settings
          </Typography>
          <CustomizedSwitches />
        </StyledBox>
        <Divider />

        <StyledBox
          sx={{
            pb: 2,
            height: "100%",
            overflow: "auto",
            px: 0,
          }}
        >
          <TabContext
            sx={{ paddingBlock: "none", width: "100%" }}
            value={value}
          >
            <TabsCustom onChange={handleChange}>
              {tabs.map((tab, index) => (
                <TabCustom label={tab} key={index} value={`${index}`} />
              ))}
            </TabsCustom>
            <TabPanelCustome value={"0"}>
              <GetTable
                loading={loadingInProgress}
                columns={columns}
                row={row}
              />
            </TabPanelCustome>
            <TabPanelCustome value={"1"}>
              <GetTable
                loading={loadingInProgress}
                columns={columns}
                row={row}
              />
            </TabPanelCustome>
          </TabContext>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;

const GetTable = ({ loading, row, columns }) => {
  return (
    <DataGrids
      search
      hideFooter
      loading={loading}
      dataRow={row ?? []}
      dataColumn={columns}
      sx={{
        maxHeight: "600px",
        paddingBlock: "20px",
        paddingInline: "10px",

        "& *": {
          fontFamily: "Poppins",
        },
      }}
    />
  );
};

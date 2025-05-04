import { TransparentButtonStyled } from "@common/Buttons";
import { TruncatedComponent } from "@common/MUI";
import {
  Global_Join_Project,
  Global_Join_Project_Error,
} from "@constants/index";
import { useGetRole } from "@hooks/index";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { setAlert } from "@store/Features/AlertSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JoinChat = ({ chatInfo, setData, requested }) => {
  const { socket } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const role = useGetRole();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.socket.on(Global_Join_Project, (Global_Join_Project) => {
      console.log(Global_Join_Project, "GLOBAL_JOIN_PROJECT");
      setData({ ...Global_Join_Project?.data });
      setLoading(false);
    });
    socket.socket.on(Global_Join_Project_Error, (Global_Join_Project_Error) => {
      console.log(Global_Join_Project_Error, "Global_Join_Project_Error");
      dispatch(
        setAlert({ status: "error", text: Global_Join_Project_Error?.error })
      );
      setLoading(false);
    });
    return () => {
      setLoading(false);
      socket.socket?.off(Global_Join_Project);
      socket.socket?.off(Global_Join_Project_Error);
    };
  }, []);
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      height={"min(700px, 95%)"}
      width={"100%"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        color={"black"}
        m={"auto"}
        width={`min(550px, 95%)`}
        borderRadius={"8px"}
        minHeight={200}
        boxShadow={"0px 1px 20px 0px rgba(0, 0, 0,.2)"}
        fontWeight={"600"}
        fontSize={"18px"}
        paddingInline={2}
        textAlign={"center"}
      >
        <TruncatedComponent Component={"span"} lines={3}>
          {chatInfo?.name}
        </TruncatedComponent>
        {!requested ? (
          <Stack width={"165px"} flexDirection={"row"}>
            <TransparentButtonStyled
              onClick={() => {
                setLoading(true);
                socket.socket?.emit(Global_Join_Project, {
                  chatId: chatInfo._id,
                  role: role,
                });
              }}
              variant="contained"
              disabled={loading}
              sx={{
                fontSize: 14,
                fontWeight: "550",
                fontFamily: "var(--chatFont)",
                padding: "4px 10px",
                color: loading ? "gray" : undefined,
                borderColor: loading ? "gray" : undefined,
                transition: "all 0.3s ease",
                paddingRight: loading ? "20px" : undefined,
              }}
            >
              {" "}
              join chat !
            </TransparentButtonStyled>
            <LoadingButton
              loading={true}
              sx={{
                minWidth: 0,
                position: "relative",
                left: "-30px",
                transform: loading ? "scale(1)" : "scale(0)",
              }}
            />
          </Stack>
        ) : (
          <TransparentButtonStyled
            variant="contained"
            disabled={loading}
            sx={{
              maxWidth: "160px",
              fontSize: 14,
              fontWeight: "550",
              fontFamily: "var(--chatFont)",
              padding: "4px 10px",
              color: "gray",
              borderColor: "gray",
              transition: "all 0.3s ease",
              cursor: "default",
              boxShadow: "none",
            }}
          >
            Requested!
          </TransparentButtonStyled>
        )}
      </Stack>
    </Stack>
  );
};

export default JoinChat;

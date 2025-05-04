import InputFields from "@common/InputFields/InputFields";
import { useEffect, useRef, useState } from "react";
import { Stack, styled } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import ButtonMui from "@common/MUI/ButtonMUI";
import { Send } from "@mui/icons-material";

const Styleddiv = styled("div")(({ theme, isTagged }) => ({
  color: isTagged ? "white" : "#4b4b4b",
  padding: "2px 10px",
  background: isTagged ? "#223143" : undefined,
  borderRadius: 5,
  fontSize: "15px",
  maxWidth: "max-content",
  "&:hover": {
    color: isTagged ? undefined : "black",
    cursor: "pointer",
    textDecoration: !isTagged ? "underline" : undefined,
  },
}));
function TextInput({
  sendMessageToChat,
  stopTypingEvent,
  startTypingEvent,
  members,
  open,
}) {
  const [value, setValue] = useState("");
  const [tagged, setTagged] = useState([]);
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [IamTyping, setIamTyping] = useState(false);
  const typingTimeout = useRef(null);

  useEffect(() => {
    setOpenAutoComplete(false);
    setTagged([]);
  }, [open]);

  const onChange = (e) => {
    if (openAutoComplete) {
      setOpenAutoComplete(false);
    }
    setValue(e.target.value);

    if (!IamTyping) {
      startTypingEvent();
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      stopTypingEvent();
      setIamTyping(false);
    }, [1000]);
  };

  return (
    <Stack
      sx={{
        width: "96%",
        position: "absolute",
        bottom: 1,
        left: "50%",
        transform: "translate(-50%)",
        paddingBlock: 1.5,
      }}
      direction={"row"}
      gap={1}
      alignItems={"center"}
    >
      <ButtonMui
        onClick={() => {
          setOpenAutoComplete((e) => !e);
        }}
        sx={{ paddingBlock: 2, mt: 1 }}
        variant={"contained"}
      >
        <TagIcon />
      </ButtonMui>
      {openAutoComplete ? (
        <Stack
          sx={{
            position: "absolute",
            bottom: "69px",
            width: "100%",
            height: "200px",
            background: "white",
            overflow: "auto",
            borderRadius: "10px",
            boxShadow: "0px 0px 5px 0px black",
            p: 1,
          }}
          direction={"column"}
          gap={".2rem"}
        >
          {members?.map((e) => {
            const isTagged = tagged?.find((tag) => tag?.id == e?._id);
            return (
              <Styleddiv
                isTagged={isTagged}
                onClick={() => {
                  setTagged((tags) => {
                    if (isTagged) {
                      return tags?.filter((tag) => tag?.id !== e?._id);
                    }
                    return [
                      ...tags,
                      {
                        id: e?._id,
                        model: e?.model,
                      },
                    ];
                  });
                }}
                key={e?._id}
              >
                {e?.name} ({e?.model})
              </Styleddiv>
            );
          })}
        </Stack>
      ) : null}
      <InputFields
        sx={{ backgroundColor: "#f5f5f5", border: "none", outlined: "none" }}
        type={"textbox"}
        placeholder={"send a message......"}
        rows={1}
        onChange={onChange}
        value={value}
      />

      <ButtonMui
        onClick={() => {
          sendMessageToChat({ message: value, tagged });
          setOpenAutoComplete(false);
          setTagged([]);
          setValue("");
        }}
        sx={{ paddingBlock: 2, mt: 1 }}
        variant={"contained"}
      >
        <Send />
      </ButtonMui>
    </Stack>
  );
}

export default TextInput;

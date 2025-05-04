import React, { useState, useEffect, useRef, useContext } from "react";
import ContentEditable from "react-contenteditable";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { AvatarProfile } from "../Avatar";
import { Send } from "@mui/icons-material";
import { ChatContext } from "@common/DirectRooms/rooms/context";
import { useSelector } from "react-redux";
import { useGetRole } from "@hooks/index";
import {
  Global_NEW_MESSAGE,
  GLOBAL_START_TYPING,
  GLOBAL_STOP_TYPING,
} from "@constants/index";
import DOMPurify from "dompurify";
import Typingusers from "./typingusers";

const EditableInput = styled(ContentEditable)(({ theme }) => ({
  padding: "8px",
  borderRadius: 4,
  outline: "none",
  flex: 1,
  fontSize: 16,
  maxHeight: "100%",
  overflowY: "auto",
  scrollbarWidth: "thin",

  ["&:empty:before"]: {
    content: "attr(placeholder)",
    color: "#888",
  },

  "& span.userTagged": {
    backgroundColor: "#c5ecf1",
    color: "#00796b",
    padding: "2px 4px",
    marginRight: "2px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    borderRadius: "2px",
  },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  "& > .MuiButtonBase-root": {
    paddingInline: 5,
    paddingBlock: 0,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
    "& > .MuiListItemText-root .MuiTypography-root": {
      fontSize: "12px",
      fontWeight: 500,
      fontFamily: "var(--chatFont)",
      marginLeft: 5,
    },
    "& > .MuiListItemText-root p.MuiTypography-root": {
      fontSize: "10px",
      fontWeight: 600,
      marginLeft: 5,
    },
  },
}));

const ListStyled = styled(List)(({ theme }) => ({
  borderRadius: "4px",
  maxHeight: "300px",
}));

export const Editor = () => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const role = useGetRole();
  const profile = useSelector((state) => state?.profile?.profile);
  const socket = useSelector((state) => state?.socket?.socket);
  const { chatInfo, members = [], userTyping } = useContext(ChatContext);
  const [filteredUsers, setFilteredUsers] = useState(members);
  const [IamTyping, setIamTyping] = useState(false);
  const typingTimeout = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const updateInputValue = (value) => {
    setInputValue(value);
    let query = value;
    if (value.includes("@")) {
      query = value.split("@").pop();
    }
    const filtered = members?.filter((user) => {
      return user.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.trim() === "" || value.trim() === " ") {
      setFilteredUsers(members);
      setInputValue(value);
      return;
    }
    updateInputValue(value);

    if (!IamTyping) {
      setIamTyping(true);
      startTypingEvent();
    }

    if (value.includes("@")) {
      const query = value.split("@").pop();
      if (!query.includes(" ")) {
        // setOpen(true);
      } else {
        // setOpen(false);
      }
    } else {
      // setOpen(false);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      stopTypingEvent();
      setIamTyping(false);
    }, [1000]);
  };

  const handleUserSelect = (user) => {
    const parts = inputValue.split("@");
    parts.pop();
    const newValue = `${parts.join("@")}<span class="userTagged" id="${
      user?._id ?? user?.id
    }" model="${user?.model ?? 123}" contenteditable="false">@${
      user?.name
    }</span> `;
    setInputValue(newValue);
    updateInputValue(newValue);
    // setOpen(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        // setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ["span"],
      ALLOWED_ATTR: ["class", "id", "model", "contenteditable"],
    });
  };

  const sanitizedInput = sanitizeInput(inputValue);
  const _id = profile?.[role]?._id ?? profile?._id;
  const name =
    profile?.[role]?.name ??
    profile?.account?.name ??
    profile?.name ??
    profile?.firstName + " " + profile?.lastName;

  const handleMessageSend = () => {
    const parser = new DOMParser();
    if (!sanitizedInput) return;
    const doc = parser.parseFromString(sanitizedInput, "text/html");

    const spans = doc.querySelectorAll("span.userTagged");
    const tagged = Array.from(spans).map((span) => {
      const id = span?.getAttribute("id");
      const model = span?.getAttribute("model");
      return {
        id: id,
        model: model,
      };
    });

    const dataToSend = {
      tagged: tagged,
      message: inputValue,
      chatId: chatInfo?._id,
      user: {
        name,
        _id,
        type: role,
      },
    };
    socket.emit(`${Global_NEW_MESSAGE}`, dataToSend);
    setInputValue("");
    stopTypingEvent();
    setIamTyping(false);
  };

  /* typing events */
  const startTypingEvent = () => {
    socket?.emit(GLOBAL_START_TYPING, {
      name,
      role: role,
    });
  };

  /* start typing event  */
  const stopTypingEvent = () => {
    socket?.emit(GLOBAL_STOP_TYPING, {});
  };

  return (
    <Paper
      sx={{
        height: "calc(var(--headerHeight) * 1.6)",
        mt: 1,
        m: "auto",
        width: "98%",
        position: "relative",
      }}
    >
      {" "}
      {/* {open && (
        <Paper
          ref={dropdownRef}
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            bottom: "100%",
            marginBottom: "4px",
            maxWidth: "350px",
            minWidth: "220px",
            maxHeight: "150px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            border: "1px solid #e0e0e0",
          }}
        >
          <ListStyled sx={{ p: 0 }}>
            {filteredUsers.map((user) => (
              <ListItemStyled
                key={user?._id}
                onClick={() => handleUserSelect(user)}
                sx={{ py: 0.4 }}
              >
                <ListItemButton
                  sx={{
                    boxShadow: "none !important",
                  }}
                >
                  <AvatarProfile
                    name={user.name}
                    src={user.image}
                    sx={{ height: 30, width: 30, mt: -0.2 }}
                  />
                  <ListItemText
                    sx={{
                      // fontSmooth: "antialiased",
                      // MozOsxFontSmoothing: "auto",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                    primary={user.name}
                    secondary={user.role}
                  />
                </ListItemButton>
              </ListItemStyled>
            ))}
            {filteredUsers.length === 0 && (
              <Typography style={{ padding: 8 }}>No users found</Typography>
            )}
          </ListStyled>
        </Paper>
      )} */}
      <Paper
        elevation={1}
        sx={{
          p: "0px 8px",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          height: "auto",
          minHeight: "100%",
          fontFamily: "var(--chatFont)",
          flexWrap: "wrap",
          background: "white",
          position: "absolute",
          width: "100%",
          bottom: 0,
          maxHeight: "280px",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        <EditableInput
          innerRef={inputRef}
          html={sanitizedInput}
          disabled={false}
          onChange={handleInputChange}
          tagName="div"
          placeholder="say hi!"
          className="editable-input"
        />
        <IconButton onClick={handleMessageSend}>
          <Send />
        </IconButton>
      </Paper>
      <Typingusers userTyping={userTyping} />
    </Paper>
  );
};

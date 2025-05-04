import { FormLabel, Grid, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TooltipMui from "../AnimationMui/TooltipMui";
import { Quiz } from "@mui/icons-material";

const Editor = ({ label, tooltipText, required }) => {
  const LabelForInput = styled(FormLabel)(({ theme }) => ({
    color: "black",
    fontSize: "1.1rem",
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  }));

  const [content, setContent] = useState("");

  const handleInsertTable = () => {
    const range = quillRef.current.getEditor().getSelection();
    const tableHTML =
      '<table border="1"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>';
    quillRef.current
      .getEditor()
      .clipboard.dangerouslyPasteHTML(range.index, tableHTML);
  };

  const quillRef = React.useRef(null);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        [{ table: "Insert Table" }],
      ],
      handlers: {
        table: handleInsertTable,
      },
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className="custom-rich-text-editor">
      <Grid container>
        <Grid item xs={12}>
          <Stack gap={1} direction={"row"}>
            <LabelForInput color="error" required={required ? true : false}>
              {label}
            </LabelForInput>
            {tooltipText && (
              <TooltipMui
                text={tooltipText}
                icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
              />
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={handleChange}
            ref={quillRef}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Editor;

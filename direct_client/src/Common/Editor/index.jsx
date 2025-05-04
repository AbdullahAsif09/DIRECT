import { FormLabel, Grid, Stack, styled } from "@mui/material";
import React, { useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TooltipMui from "../AnimationMui/TooltipMui";
import { Quiz } from "@mui/icons-material";
import CkEditor from "./CKEditor";

const Editor = ({
  setFieldValue,
  tooltipText,
  labelWeight,
  paddingTop,
  labelSize,
  onChange,
  required,
  value,
  label,
  name,
  gap,
}) => {
  const LabelForInput = styled(FormLabel, {
    shouldForwardProp: (prop) => {
      return prop !== "labelSize" && prop !== "labelWeight";
    },
  })(({ labelWeight, labelSize }) => ({
    color: "black",
    fontSize: labelSize ? labelSize : "1.1rem",
    fontWeight: labelWeight ? labelWeight : "400px",
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  }));

  return (
    <div className="custom-rich-text-editor">
      <Grid
        container
        gap={gap ? gap : 0}
        sx={{ pt: paddingTop ? paddingTop : 0 }}
      >
        <Grid item xs={12}>
          <Stack gap={1} direction={"row"}>
            <LabelForInput
              labelWeight={labelWeight}
              labelSize={labelSize}
              color="error"
              required={required ? true : false}
            >
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
          {onChange ? (
            <CkEditor value={value} name={name} onChange={onChange} />
          ) : (
            <CkEditor value={value} name={name} setFieldValue={setFieldValue} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Editor;

//? Can use this

// import {
//   HtmlEditor,
//   Image,
//   Inject,
//   Link,
//   QuickToolbar,
//   RichTextEditorComponent,
//   Table,
//   Toolbar,
// } from "@syncfusion/ej2-react-richtexteditor";
// import * as React from "react";
// const iframeSetting = { enable: true };

// function Editor() {
//   const toolbarSettings = {
//     items: [
//       "Bold",
//       "Italic",
//       "Underline",
//       "StrikeThrough",
//       "FontName",
//       "FontSize",
//       "FontColor",
//       "BackgroundColor",
//       "LowerCase",
//       "UpperCase",
//       "|",
//       "Formats",
//       "Alignments",
//       "OrderedList",
//       "UnorderedList",
//       "Outdent",
//       "Indent",
//       "|",
//       "CreateLink",
//       "Image",
//       "|",
//       "ClearFormat",
//       "Print",
//       "SourceCode",
//       "FullScreen",
//       "|",
//       "Undo",
//       "Redo",
//       "CreateTable",
//     ],
//   };
//   const quickToolbarSettings = {
//     image: [
//       "Replace",
//       "Align",
//       "Caption",
//       "Remove",
//       "InsertLink",
//       "OpenImageLink",
//       "-",
//       "EditImageLink",
//       "RemoveImageLink",
//       "Display",
//       "AltText",
//       "Dimension",
//     ],
//     link: ["Open", "Edit", "UnLink"],
//   };
//   return (
//     <div>
//       <RichTextEditorComponent
//         height={450}
//         toolbarSettings={toolbarSettings}
//         quickToolbarSettings={quickToolbarSettings}
//       >
//         <p>
//           The Rich Text Editor component is WYSIWYG ("what you see is what you
//           get") editor that provides the best user experience to create and
//           update the content. Users can format their content using standard
//           toolbar commands.
//         </p>
//         <p>
//           <b>Key features:</b>
//         </p>
//         <ul>
//           <li>
//             <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
//           </li>
//           <li>
//             <p>Capable of handling markdown editing.</p>
//           </li>
//           <li>
//             <p>
//               Contains a modular library to load the necessary functionality on
//               demand.
//             </p>
//           </li>
//           <li>
//             <p>Provides a fully customizable toolbar.</p>
//           </li>
//           <li>
//             <p>
//               Provides HTML view to edit the source directly for developers.
//             </p>
//           </li>
//           <li>
//             <p>Supports third-party library integration.</p>
//           </li>
//           <li>
//             <p>Allows preview of modified content before saving it.</p>
//           </li>
//           <li>
//             <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
//           </li>
//           <li>
//             <p>Contains undo/redo manager.</p>
//           </li>
//           <li>
//             <p>Creates bulleted and numbered lists.</p>
//           </li>
//         </ul>
//         <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
//       </RichTextEditorComponent>
//     </div>
//   );
// }

// export default Editor;
// import React from "react";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// import "froala-editor/js/plugins/table.min.js";
// import { FormLabel, Grid, Stack, styled } from "@mui/material";
// import TooltipMui from "../AnimationMui/TooltipMui";
// import "froala-editor/js/plugins/image.min.js";
// import { Quiz } from "@mui/icons-material";
// function Editor({ label, tooltipText , required}) {
//   const LabelForInput = styled(FormLabel)(({ theme }) => ({
//     color: "black",
//     fontSize: "1.1rem",
//     "& .MuiFormLabel-asterisk": {
//       color: "red",
//     },
//   }));
//   return (
//     <div>
//       <Grid container>
//         <Grid item xs={12}>
//           <Stack gap={1} direction={"row"}>
//             <LabelForInput
//               color="error"
//               required={required ? true : false}
//               // className="emailInputLabel"
//             >
//               {label}
//             </LabelForInput>
//             {tooltipText && (
//               <TooltipMui
//                 text={tooltipText}
//                 icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
//               />
//             )}
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           <FroalaEditorComponent
//             tag="textarea"
//             plugins={["table" /* Other plugins you need */,"image"]}
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Editor;
// import { Grid, Stack, FormLabel, styled } from "@mui/material";
// import { FormatBold, Quiz } from "@mui/icons-material";
// import EditorContainer from "./EditorContainer";
// import TooltipMui from "../AnimationMui/TooltipMui";
// const LabelForInput = styled(FormLabel)(({ theme }) => ({
//   color: "black",
//   fontSize: "1.1rem",
//   "& .MuiFormLabel-asterisk": {
//     color: "red",
//   },
// }));
// function Editor({ required, label, tooltipText }) {
//   return (
//     <Grid container>
//       <Grid item xs={12}>
//         <Stack gap={1} direction={"row"}>
//           <LabelForInput
//             color="error"
//             required={required ? true : false}
//             // className="emailInputLabel"
//           >
//             {label}
//           </LabelForInput>
//           {tooltipText && (
//             <TooltipMui
//               text={tooltipText}
//               icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
//             />
//           )}
//         </Stack>
//       </Grid>
//       <Grid item xs={12}>
//         <EditorContainer />
//       </Grid>
//     </Grid>
//   );
// }

// export default Editor;

import { Box } from "@mui/material";
import TypographyMUI from "../../../../MUI/TypographyMUI";
import { ArrowDownward } from "@mui/icons-material";

import ButtonMui from "../../../../MUI/ButtonMUI";
import { keys } from "@config";
const DocImage = "/assets/Docs_icons.svg";
function FileDetails({ fileData }) {
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"10px 0"}
      >
        <Box display={"flex"} gap={1.6}>
          <Box>
            <img src={DocImage} alt="Doc" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: -1.5 }}>
            <TypographyMUI sx={{ color: "#7DC1FF", fontSize: "15px" }}>
              {fileData?.name}
            </TypographyMUI>
            {/* <TypographyMUI sx={{ fontSize: "13px" }}>10MB</TypographyMUI> */}
          </Box>
        </Box>
        <Box>
          <ButtonMui
            href={keys.rootserver + fileData?.path}
            endIcon={
              <ArrowDownward sx={{ fontSize: "17px", marginLeft: "5px" }} />
            }
            sx={{
              border: ".5px solid grey",
              color: "#36454F",
              fontSize: "12px",
            }}
          >
            Download
          </ButtonMui>
        </Box>
      </Box>
    </div>
  );
}

export default FileDetails;

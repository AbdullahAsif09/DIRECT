import { Quiz } from "@mui/icons-material";
import { Button, Fab, Grow, Stack, Tooltip, Typography } from "@mui/material";
import TooltipMui from "../TooltipMui";

function IconsHeadings({
  text,
  icons,
  helpOutline,
  button,
  startIconButton,
  paddingBottom,
  paddingTop,
  paddingLeft,
  handleClickButton,
  variantHeadings,
}) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={1.5}
      sx={{
        pb: paddingBottom ? paddingBottom : 0,
        pl: paddingLeft ? paddingLeft : 0,
        pt: paddingTop ? paddingTop : 0,
      }}
    >
      {icons ? (
        <Fab disabled size="small" aria-label="upload">
          {icons}
        </Fab>
      ) : null}
      <Typography
        variant={variantHeadings ? variantHeadings : "h3"}
        fontWeight={600}
      >
        {text}
      </Typography>
      {helpOutline && (
        <TooltipMui
          icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
          text={helpOutline}
        />
      )}
      {button && (
        <Button
          onClick={() => handleClickButton}
          sx={{
            marginLeft: "auto",
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#008080",
            },
          }}
          variant="contained"
          startIcon={startIconButton}
        >
          {button}
        </Button>
      )}
    </Stack>
  );
}

export default IconsHeadings;

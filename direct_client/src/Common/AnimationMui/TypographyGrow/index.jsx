import { Grow, Stack, Typography } from "@mui/material";
import TooltipMui from "../TooltipMui";
function TypographyGrow({
  text,
  variant,
  timeout = 750,
  align,
  width,
  lineHeight,
  tooltipIcon,
  tooltipText,
}) {
  return (
    <Grow in timeout={timeout}>
      <Stack component={"div"} direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Typography
          lineHeight={lineHeight ? lineHeight : 1}
          width={width ? width : "100%"}
          textAlign={align ? align : "center"}
          variant={variant}
        >
          {text}
        </Typography>
        {tooltipIcon && <TooltipMui text={tooltipText} icon={tooltipIcon} />}
      </Stack>
    </Grow>
  );
}

export default TypographyGrow;

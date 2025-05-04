import { ArrowBack } from "@mui/icons-material";
import { Stack } from "@mui/material";
import TypographyMUI from "../../../MUI/TypographyMUI";

export function BackButtons({
  children,
  variant,
  typographyStyled,
  arrowStyled,
  sx,
  ...rest
}) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={1}
      sx={sx}
      {...rest}
    >
      <ArrowBack sx={arrowStyled} />
      <TypographyMUI sx={typographyStyled} variant={variant}>
        {children}
      </TypographyMUI>
    </Stack>
  );
}

export default BackButtons;

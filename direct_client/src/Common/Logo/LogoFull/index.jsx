import { Stack, styled } from "@mui/system";
import { LogoWrapper } from "../Logo";

export const LogoWrapperFull = ({
  height = null,
  width = null,
  direction = "row",
  onClick = () => {},
  style = {},
  justifyContent,
  ...rest
}) => {
  const Bold = styled("span")(({ theme }) => ({
    fontWeight: "450",
    minWidth: "350px !important",
    display: "box",
    fontSize: "14.8px",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  }));

  return (
    <Stack
      alignItems={"center"}
      justifyContent={justifyContent ? justifyContent : "center"}
      gap={"1rem"}
      direction={direction}
      onClick={onClick}
      sx={style}
      {...rest}
    >
      <LogoWrapper width={width} height={height} />
      <Bold>
        Development, Innovation, and Research for <br /> Evolving Cutting-edge
        Technologies
      </Bold>
    </Stack>
  );
};

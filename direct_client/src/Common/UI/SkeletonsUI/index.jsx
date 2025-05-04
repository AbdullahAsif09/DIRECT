import { Skeleton } from "@mui/material";

export function SkeletonsUI({ width, height, variant, ...rest }) {
  return <Skeleton variant={variant} width={width} height={height} {...rest} />;
}

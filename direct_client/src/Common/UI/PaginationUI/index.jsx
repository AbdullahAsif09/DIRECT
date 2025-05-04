import { Pagination } from "@mui/material";

export function PaginationUI({ count, variant, shape, ...rest }) {
  return (
    <div>
      <Pagination count={count} variant={variant} shape={shape} {...rest} />
    </div>
  );
}

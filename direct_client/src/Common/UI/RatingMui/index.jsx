import { Rating } from "@mui/material";

export function RatingMui({ setValue, ...rest }) {
  return (
    <Rating
      name="half-rating"
      onChange={setValue}
      defaultValue={0}
      precision={0.1}
    />
  );
}

export default RatingMui;

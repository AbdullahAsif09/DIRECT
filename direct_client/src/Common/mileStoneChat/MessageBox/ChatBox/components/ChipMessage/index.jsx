import { Chip, Stack } from "@mui/material";

export function ChipMessage({ date, message = "", showTime }) {
  const time = showTime ? new Date(date).toLocaleTimeString() : "";
  const day = new Date(date).toDateString();
  const dateString = date ? day + " " + time : "";
  return (
    <Stack
      justifyContent={"center"}
      flexDirection={"row"}
      sx={{ width: "100%", p: 1.7 }}
    >
      <Chip
        label={`${message} ${dateString}`}
        variant="outlined"
        sx={{ width: "max-content", fontWeight: "bold" }}
      />
    </Stack>
  );
}

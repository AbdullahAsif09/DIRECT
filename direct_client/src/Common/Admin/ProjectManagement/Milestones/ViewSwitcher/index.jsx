import "gantt-task-react/dist/index.css";
import { Button, ButtonGroup, Stack, styled } from "@mui/material";
const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButtonGroup-grouped:not(:last-of-type) ": {
    backgroundColor: theme.palette.bg.greenMui,
    borderColor: theme.palette.bg.black,
    "&:hover": {
      backgroundColor: theme.palette.bg.greenMuiHover,
      borderColor: theme.palette.bg.black,
    },
  },
}));
const StyledButtons = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.greenMui,
  "&:hover": {
    backgroundColor: theme.palette.bg.greenMuiHover,
  },
}));
function ViewSwitcher({ onViewModeChange, onViewListChange, isChecked }) {
  return (
    <Stack direction={"row"} justifyContent={"flex-end"}>
      <StyledButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <StyledButtons onClick={() => onViewModeChange("Day")}>
          Days
        </StyledButtons>
        <StyledButtons onClick={() => onViewModeChange("Week")}>
          Week
        </StyledButtons>
        <StyledButtons onClick={() => onViewModeChange("Month")}>
          Month
        </StyledButtons>
      </StyledButtonGroup>
    </Stack>
  );
}

export default ViewSwitcher;

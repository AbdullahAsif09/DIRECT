import { Fade, Tooltip, styled } from "@mui/material";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: #252B42;
    font-size:14px; 
    padding:7px 15px;
  },
  & .MuiTooltip-arrow {
    color: #252B42;
    },
`;
function TooltipMui({ icon, text }) {
  return (
    <div>
      <StyledTooltip
        arrow
        placement="right-end"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        title={
          text
            ? text
            : "Write info of Quiz info. Write info of Quiz info. Write info of Quiz info. Write info of Quiz info. Write info of Quiz info"
        }
      >
        {icon}
      </StyledTooltip>
    </div>
  );
}

export default TooltipMui;

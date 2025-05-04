import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

function Accordions({ dataAccodions }) {
  return (
    <div>
      {dataAccodions?.faqs?.data?.map((e, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${1 + i}}a-content`}
            id={`panel${1 + i}}a-header`}
          >
            <Typography variant="body2">{e.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{e.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Accordions;

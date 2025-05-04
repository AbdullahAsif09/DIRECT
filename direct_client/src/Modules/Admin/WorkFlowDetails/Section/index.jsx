import { Grid } from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import AccordionStyled from "@common/AnimationMui/Accordion/AccordionStyled";
function Section({ title, icon }) {
  const arrayDataOne = [
    {
      title: "Call for Proposals",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
    {
      title: "Submission of Technical and Financial Propsoals",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
    {
      title: "Vetting",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
    {
      title: "Pre-award Formalities",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
    {
      title: "Awarded",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
  ];
  const arrayDataTwo = [
    {
      title: "Contracted",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
  ];
  const arrayDataThree = [
    {
      title: "Milestones",
      proposals: 12,
      ProposalSubmissionDate: 12,
    },
  ];
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <IconsHeadings text={title} variantHeadings={"h2"} icons={icon} />
      </Grid>
      <Grid item xs={12}>
        {title === "Completed" && (
          <AccordionStyled dataAccordion={arrayDataOne} />
        )}
        {title === "Ongoing" && (
          <AccordionStyled dataAccordion={arrayDataTwo} />
        )}
        {title === "Upcoming" && (
          <AccordionStyled disabled dataAccordion={arrayDataThree} />
        )}
      </Grid>
    </Grid>
  );
}

export default Section;

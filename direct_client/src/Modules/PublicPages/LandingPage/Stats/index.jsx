import {
  FolderCopyOutlined,
  HowToReg,
  ModelTraining,
  AddTask,
} from "@mui/icons-material";
import { Grid, styled } from "@mui/material";
import IconText from "@common/IconText";
import { SectionContainer } from "@common/UI";
const SVG = styled("svg")(({ theme }) => ({
  color: theme.palette.bg.green,
}));
const Stats = () => {
  const arr = [
    {
      icon: (
        <SVG>
          <ModelTraining />
        </SVG>
      ),
      number: 0,
      text: "Researchers",
    },
    {
      icon: (
        <SVG>
          <AddTask />
        </SVG>
      ),
      number: 0,
      text: "Fund Disbursed",
    },
    {
      icon: (
        <SVG>
          <HowToReg />
        </SVG>
      ),
      number: 0,
      text: "Domain Experts",
    },
    {
      icon: (
        <SVG>
          <FolderCopyOutlined />
        </SVG>
      ),
      number: 0,
      text: "Industries",
    },
  ];
  return (
    <SectionContainer>
      <Grid
        container
        width={"100%"}
        justifyContent={"center"}
        // columnGap={"3rem"}
        rowGap={"3rem"}
        sx={{
          "@media screen and (max-width:750px)": {
            display: "flex",
            "& > *": {
              flexBasis: "50% !imporant",
            },
          },
        }}
      >
        {arr?.map((icondata, i) => {
          return (
            <Grid item key={i} xs={12} sm={6} md={4.7} lg={3}>
              <IconText
                icon={icondata?.icon}
                text={icondata?.text}
                number={icondata?.number}
                Green
              />{" "}
            </Grid>
          );
        })}
      </Grid>
    </SectionContainer>
  );
};

export default Stats;

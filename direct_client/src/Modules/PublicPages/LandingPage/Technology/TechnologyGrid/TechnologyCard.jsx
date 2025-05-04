import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, styled } from "@mui/material";
import FlipCard from "react-card-flip";
import { Factory, HowToReg, School } from "@mui/icons-material";
const SVG = styled("svg")(({ theme }) => ({
  width: "30px",
  color: "white",
}));

const FrontCardContent = styled(CardContent)`
  background-color: #f0f0f0;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BackCardContent = styled(CardContent)(({ theme }) => {
  return {
    // backgroundColor: "#e0e0e0",
    // background: theme.palette.bg.green,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "rotateY(180deg)",
    // borderRadius: "20px",
  };
});
const CardStyled = styled(Card)(({ theme }) => {
  return {
    background: theme.palette.bg.greenDark,
    color: "white",
  };
});

const CardContainer = styled("div")`
  width: 100%;
  max-width: 300px;
  perspective: 1000px;
  margin: auto;
`;
const ImageCom = styled("img")`
  height: 55px;
  width: 55px;
  margin: auto;
  display: block;
`;

const FlipCardComponent = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const arr = [
    {
      icon: (
        <SVG>
          <Factory />
        </SVG>
      ),
      number: data?.industry ?? 0,
      text: "Industry",
    },
    {
      icon: (
        <SVG>
          <HowToReg />
        </SVG>
      ),
      number: data?.academia ?? 0,
      text: "Domain Experts",
    },
    {
      icon: (
        <SVG>
          <School />
        </SVG>
      ),
      number: data?.resarchers ?? 0,
      text: "Researcher",
    },
  ];
  return (
    <CardContainer
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <FlipCard
        flipSpeedFrontToBack={0.8}
        flipSpeedBackToFront={0.8}
        isFlipped={isFlipped}
      >
        <Card
          elevation={0}
          style={{
            height: 190,
            cursor: "pointer",
            background: "transparent",
          }}
        >
          <FrontCardContent
            style={{
              display: "block",
              background: "transparent",
            }}
          >
            <ImageCom alt={data?.name} src={data?.image} />
            <Typography
              variant="h4"
              marginTop={"2rem"}
              textAlign={"center"}
              fontWeight={"600"}
            >
              {data?.name}
            </Typography>
          </FrontCardContent>
        </Card>
        <CardStyled
          elevation={isFlipped ? 8 : 0}
          style={{
            transform: "rotateY(180deg)",
            height: 190,
            cursor: "pointer",
            opacity: isFlipped ? 1 : 0,
            transition: "opacity .3s ease-in-out",
            borderRadius: 20,
            maxWidth: "95%",
            marginInline: "auto",
          }}
        >
          <BackCardContent
            style={{ background: "transparent", boxSizing: "border-box" }}
          >
            <div>
              {arr?.map((tech, index) => {
                return (
                  <Stack
                    key={index}
                    direction={"row"}
                    alignItems={"center"}
                    gap={".5rem"}
                    height={50}
                  >
                    {tech?.icon}
                    <span> {tech?.number}</span>
                    <span>{tech?.text}</span>
                  </Stack>
                );
              })}
            </div>
          </BackCardContent>
        </CardStyled>
      </FlipCard>
    </CardContainer>
  );
};

export default FlipCardComponent;

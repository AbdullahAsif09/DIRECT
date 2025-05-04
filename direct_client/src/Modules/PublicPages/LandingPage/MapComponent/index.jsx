import { useEffect, useState } from "react";
import { Grid, Typography, styled, Stack } from "@mui/material";
import MAP from "./map";
import MapIcons from "@common/IconText/mapIcons.jsx";
import { Factory, HowToReg, School } from "@mui/icons-material";
import { SectionContainer } from "@common/UI";
import { useSelector } from "react-redux";
const Dots = "/assets/dots.svg";

const SVG = styled("svg")(({ theme }) => ({
  color: "white",
}));

const MapComponent = () => {
  const qalamData = useSelector((state) => state.qalam);
  const [data, setdata] = useState({
    Punjab: {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    Islamabad: {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    Balochistan: {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    "Gilgit-Baltistan": {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    "Azad Kashmir": {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    "Khyber Pakhtunkhwa": {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    Sindh: {
      industry: 0,
      experts: 0,
      academia: 0,
    },
    FATA: {
      industry: 0,
      experts: 0,
      academia: 0,
    },
  });
  const [active, setactive] = useState("Punjab");
  const [arr, setarr] = useState([
    {
      icon: (
        <SVG>
          <Factory />
        </SVG>
      ),
      number: "0",
      text: "Industries",
      key: "industry",
    },
    {
      icon: (
        <SVG>
          <HowToReg />
        </SVG>
      ),
      number: "0",
      text: "Domain Experts",
      isUser: true,
    },
    {
      icon: (
        <SVG>
          <School />
        </SVG>
      ),
      number:
        qalamData?.profiles?.length > 0 ? qalamData?.profiles?.length : "0",
      text: " Researchers",
    },
  ]);
  const [subarr, setsubarr] = useState([
    {
      icon: (
        <SVG>
          <Factory />
        </SVG>
      ),
      number: "0",
      text: "Industries",
    },
    {
      icon: (
        <SVG>
          <HowToReg />
        </SVG>
      ),
      number: "0",
      text: "Domain Experts",
      isUser: true,
    },
    {
      icon: (
        <SVG>
          <School />
        </SVG>
      ),
      number: "0",
      text: "Researchers",
    },
  ]);
  useEffect(() => {
    if (active) {
      const map = subarr.map((e, i) => {
        if (i == 0) {
          return {
            icon: (
              <SVG>
                <Factory />
              </SVG>
            ),
            number: data[active].industry,
            text: "Industries",
          };
        }
        if (i == 1) {
          return {
            icon: (
              <SVG>
                <HowToReg />
              </SVG>
            ),
            number: data[active].experts,
            text: "Domain Experts",
          };
        }
        if (i == 2) {
          return {
            icon: (
              <SVG>
                <School />
              </SVG>
            ),
            number: data[active].academia,
            text: " Researchers",
            id: "Academia",
          };
        }
      });
      setsubarr(map);
    }
  }, [active]);

  return (
    <MAPWRAPPERStyled>
      <SectionContainer>
        <Grid container color={"white"} justifyContent={"center"}>
          <ImageWrapper alt="pakistanMAP" src={Dots} />
          <Grid item xs={12} marginBottom={"5rem"}>
            <Typography
              variant="h1"
              textAlign={"center"}
              fontWeight={600}
              color={"white"}
            >
              Technology Map
            </Typography>
          </Grid>

          <Grid
            item
            md={12}
            lg={12}
            xl={10}
            sm={12}
            xs={12}
            style={{ padding: "0" }}
          >
            <Icons item md={12} sm={12} xs={12}>
              <Typography variant="h2" marginY={"2.5rem"} color={"white"}>
                Total
              </Typography>
              <RStack className="dummyparent">
                {arr?.map((icon, i) => {
                  return (
                    <MapIcons
                      key={i}
                      icon={icon.icon}
                      number={icon.number}
                      text={icon.text}
                      isUser={icon?.isUser}
                    />
                  );
                })}
              </RStack>
              <Typography
                variant="h2"
                sx={{ mt: 16 }}
                marginY={"2.5rem"}
                color={"white"}
              >
                {active}
              </Typography>
              <RStack>
                {subarr?.map((icon, i) => {
                  return (
                    i < 3 && (
                      <MapIcons
                        key={i}
                        icon={icon.icon}
                        number={icon.number}
                        text={icon.text}
                        isUser={icon?.isUser}
                      />
                    )
                  );
                })}
              </RStack>
            </Icons>
            <MAP active={active} setactive={setactive} />
          </Grid>
        </Grid>
      </SectionContainer>
    </MAPWRAPPERStyled>
  );
};

export default MapComponent;

const MAPWRAPPERStyled = styled("div")(({ theme }) => ({
  background: theme.palette.bg.greenDark,
  // background: "#098E6E",

  position: "relative",
  width: "100%",
  "&::before": {
    position: "absolute",
    content: "''",
    background: "#BAE1B3",
    width: "400px",
    height: "auto",
    borderRadius: "50%",
    left: "-250px",
    top: "-240px",
    zIndex: "-1",
    opacity: ".6",
    display: "none",
  },
  "&::after": {
    position: "absolute",
    content: "''",
    background: "#BAE1B3",
    width: "400px",
    height: "auto",
    borderRadius: "50%",
    right: "-250px",

    bottom: "-240px",
    zIndex: "-1",
    opacity: ".6",
    display: "none",
  },

  [theme.breakpoints.up("sm")]: {
    "&::before": {
      display: "block",
    },
    "&::after": {
      display: "block",
    },
  },
  [theme.breakpoints.down("lg")]: {
    paddingBottom: "4rem",
  },
}));
const ImageWrapper = styled("img")(({ theme }) => ({
  position: "absolute",
  width: "60px",
  top: "3rem",
  left: "1rem",
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));
const Icons = styled("div")(({ theme }) => ({
  paddingLeft: "0px",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "5rem",
  },
}));
const RStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  rowGap: "2rem",
  marginTop: "50px",
  flexWrap: "wrap",
  alignItems: "flex-start",

  [theme.breakpoints.up("sm")]: {
    columnGap: "2.5rem",
    flexDirection: "row",
  },

  [theme.breakpoints.up("lg")]: {
    columnGap: "2rem",
    maxWidth: "650px",
  },
  [theme.breakpoints.down("lg")]: {
    columnGap: "2rem",
    maxWidth: "320px",
  },
  [" @media screen and (max-width: 1000px)"]: {
    maxWidth: "100%",
  },
}));

import { Grid, Paper, Typography, styled } from "@mui/material";
import { list } from "./data";
import { Stack } from "@mui/system";
import { SectionContainer } from "@common/UI";

function Objective() {
  const StyledPapaer = styled(Paper)(({ theme }) => {
    return {
      padding: "27px 15px",
      borderRadius: "2.5rem",

      boxShadow: `0px 0px 10px 0px rgba(0, 0, 0, 0.2)`,

      [theme.breakpoints.down("md")]: {
        padding: "0px",
        boxShadow: "none",
      },
    };
  });
  const GRID = styled(Grid)(({ theme }) => {
    return {
      [theme.breakpoints.down("md")]: {
        "& h1": {
          fontSize: "2rem !important",
        },
      },
    };
  });
  const StyledOl = styled("ol")(({ theme }) => {
    return {
      display: "flex",
      flexDirection: "column",
      gap: ".7rem",
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.down("md")]: {
        paddingInline: "20px",
        textAlign: "justify",
        fontSize: ".9rem",
      },
    };
  });
  const ABSTOPRIGHT = styled("div")((data) => {
    return {
      position: "absolute",
      right: data?.bottomLeft ? undefined : "-2rem",
      top: data?.bottomLeft ? undefined : "-2rem",
      bottom: !data?.bottomLeft ? undefined : "0rem",
      left: !data?.bottomLeft ? undefined : "-5rem",
      transform: data?.bottomLeft ? "scale(-1)" : undefined,
      zIndex: "-1",
      width: "350px",
      height: "350px",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    };
  });
  return (
    <SectionContainer style={{ postion: "relative" }}>
      <ABSTOPRIGHT>
        <img alt="shape" src={"/assets/shapes/2circles.svg"} />
      </ABSTOPRIGHT>
      <ABSTOPRIGHT bottomLeft>
        <img alt="shape" src={"/assets/shapes/2circles.svg"} />
      </ABSTOPRIGHT>
      <GRID
        sx={{ width: "100%", margin: "20px auto" }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <Stack gap={"1rem"} mb={"2.5rem"}>
            <Typography variant="h1">DIRECT OBJECTIVES</Typography>
            <Typography variant="body1" maxWidth={600}>
              The objectives of DIRECT Portal are aligned with its broader
              mission and contribute to national defense capabilities,
              innovation, and collaboration. Here are some key objectives:
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <StyledPapaer>
            <StyledOl
              style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}
            >
              {list?.map((str, ind) => {
                return <li key={ind}>{str}</li>;
              })}
            </StyledOl>
          </StyledPapaer>
        </Grid>
      </GRID>
    </SectionContainer>
  );
}

export default Objective;

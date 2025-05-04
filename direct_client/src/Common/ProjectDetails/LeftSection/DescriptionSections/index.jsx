import styled from "@emotion/styled";
import { Button, Collapse, Grid, Typography } from "@mui/material";
const TypographyStyled = styled(Typography)((data) => {
  const isTrue = data?.["aria-current"];
  return {
    color: "grey",
    lineHeight: "30px",
    fontSize: "1rem",
    marginBottom: "1rem",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: isTrue === true ? 12222 : 10,
    textAlign: "left",
    ["@media screen  and (max-width:1798px)"]: {},
  };
});
const GridItemViewBtn = styled(Grid)((data) => {
  const isTrue = data?.["aria-current"];
  return {
    background: isTrue === false ? "rgb(238,238,238)" : "none",
    background:
      isTrue === false
        ? "linear-gradient(to top,white 0%, rgba(255,255,255,0.4) 100%)"
        : "none",
    paddingTop: "20px",
    paddingBottom: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-80px",
    ["@media screen  and (min-width:1799px)"]: {},
  };
});
function DescriptionSections({ DescriptionData, setShowMore, ShowMore }) {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Typography variant="h2" fontWeight={500}>
          {DescriptionData.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TypographyStyled
          textAlign={"justify"}
          variant="body1"
          fontWeight={400}
          aria-current={ShowMore}
        >
          {DescriptionData?.description}
        </TypographyStyled>{" "}
      </Grid>
      <GridItemViewBtn aria-current={ShowMore} item xs={12}>
        <Button
          sx={{ mt: 6 }}
          variant="ghost"
          color="success"
          onClick={() => setShowMore(!ShowMore)}
        >
          {ShowMore === true ? "View Less" : "View More"}
        </Button>
      </GridItemViewBtn>
    </Grid>
  );
}

export default DescriptionSections;

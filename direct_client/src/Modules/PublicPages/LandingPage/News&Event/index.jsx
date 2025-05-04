import { Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Rightcard from "./Rightcard";
import Leftcard from "./Leftcard";
import { SectionContainer } from "@common/UI";

const GridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    justifyContent: "center",
  },
}));
const GridItemTwo = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const GridItemThree = styled(Grid)(({ theme }) => ({
  marginTop: "0px",
  display: "block",
  [theme.breakpoints.down("lg")]: {
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function Index() {
  const [PaginationNumber, setPaginationNumber] = useState(1);
  const totalPages = Math.ceil(array.length / 1);
  const startIndex = (PaginationNumber - 1) * 1;
  const endIndex = startIndex + 1;
  const currentData = array.slice(startIndex, endIndex);
  const handlePageChange = (event, newPage) => {
    event.preventDefault();
    setPaginationNumber(newPage);
  };
  return (
    <SectionContainer style={{ backgroundColor: "rgba(151, 185, 177, 0.65)" }}>
      <Grid
        sx={{ height: "100%" }}
        container
        rowGap={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <GridItem item md={12} lg={6} xl={7}>
          {currentData.map((item, index) => {
            return <Leftcard item={item} key={index} />;
          })}
        </GridItem>
        <GridItemTwo item xs={12} md={12} lg={6} xl={5}>
          <Rightcard />
        </GridItemTwo>
        <GridItemThree item md={12} lg={6}>
          <Pagination
            page={PaginationNumber}
            count={totalPages}
            boundaryCount={0}
            siblingCount={1}
            onChange={handlePageChange}
            // shape="rounded"
            sx={{
              "& .Mui-selected ,& .Mui-selected:hover ": {
                background: "rgba(9, 142, 110, 0.2)",
                borderColor: "rgba(9, 142, 110, 0.2)",
                color: "#098E6E",
              },

              "& .MuiPaginationItem-previousNext ,& .MuiPaginationItem-previousNext:hover":
                {
                  background: "white",
                  borderColor: "white",
                  color: "#098E6E",
                },
            }}
          />
        </GridItemThree>
      </Grid>
    </SectionContainer>
  );
}

export default Index;

import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const BoxSection = () => {
  const [expanded1, setExpanded1] = useState(false);


    const fullList = [
      "Sed ut perspiciatis unde omnis iste",
      "Natus error sit voluptatem accusantium",
      "Doloremque laudantium",
      "Doloremque laudantium",
      "Totam rem aperiam",
      "Doloremque laudantium",
    ];

    const handleToggle1 = () => {
      setExpanded1(!expanded1);
    };
  return (
    <Box>
      <Grid item xs={12} sm={12} mt={4}>
        <Typography variant="subtitle2" sx={{ marginBottom: "5px" }}>
          Objectives
        </Typography>
        <Box
          sx={{
            background: "#EFEFEF",
            padding: "10px",
          }}
        >
          <Typography variant="h5" mb={1} fontWeight={600}>
            Nike Running Shoes - Neon Green
          </Typography>
          <Typography variant="subtitle2" component="h5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Box
            sx={{
              padding: "10px 30px",
            }}
          >
            <Typography component="ul" sx={{ padding: 0, margin: 0 }}>
              {fullList
                .slice(0, expanded1 ? fullList.length : 3)
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              {!expanded1 && <li>...</li>}
            </Typography>
            <Button onClick={handleToggle1}>
              {expanded1 ? "show less" : "show more"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default BoxSection;

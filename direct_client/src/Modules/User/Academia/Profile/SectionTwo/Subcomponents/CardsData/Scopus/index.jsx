import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function Scopus({ headingData, showMore, profileData }) {
  const [RealContent, setRealContent] = useState(null);
  useEffect(() => {
    const checkObj = () => {
      profileData?.map((e, i) => {
        const areKeysEmpty = Object.values(e).every((value) => !value);
        if (areKeysEmpty) {
          setRealContent(true);
        } else {
          setRealContent(false);
        }
      });
    };
    checkObj();
  }, []);
  return (
    <Card elevation={2} sx={{ p: 3, width: "98%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <Typography variant="h3">{headingData}</Typography>
      </Stack>
      {RealContent ? (
        <Typography
          textAlign={"center"}
          sx={{ m: 6 }}
          color={"lightgray"}
          variant="h2"
        >
          No Data Found
        </Typography>
      ) : (
        profileData?.map((e, i) => (
          <Stack
            sx={{ mt: 5, pb: 3, borderBottom: "0.5px solid lightGray" }}
            direction={"column"}
            spacing={4}
          >
            <Stack
              direction={"column"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              gap={2}
            >
              <Typography variant="h4">{e.scopus}</Typography>
              <Fab size="medium" variant="extended">
                Scopus Profile Web Link
              </Fab>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              gap={2}
            >
              <Typography variant="h4">{e.profileScopus}</Typography>
              <Fab size="medium" variant="extended">
                Scopus Profile Web Link
              </Fab>
            </Stack>
          </Stack>
        ))
      )}
      {showMore && (
        <Stack sx={{ mt: 3 }} justifyContent={"center"} alignItems={"center"}>
          <Button sx={{ textTransform: "capitalize" }} variant="ghost">
            Show More
          </Button>
        </Stack>
      )}
    </Card>
  );
}

export default Scopus;

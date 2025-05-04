import {
  CardMembership,
  ConnectWithoutContact,
  Hive,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Card, IconButton, Stack, Typography, styled } from "@mui/material";
import { useWindowSize } from "@hooks";
const DividerOne = styled("div")(({ theme }) => ({
  width: "70px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
}));
const LeftBorder = styled("div")(({ theme }) => ({
  width: "70%",
  border: "2px solid" + theme.palette.bg.greenMui,
  borderRadius: "17px",
}));
const RightBorder = styled("div")(({ theme }) => ({
  width: "20%",
  border: "2px solid" + theme.palette.bg.greenMui,
  borderRadius: "17px",
}));
const arrayContent = [
  {
    heading: "Expertise",
    icon: <Hive sx={{ fontSize: "27px", paddingTop: "5px" }} />,
  },
  {
    heading: "Social Media",
    icon: (
      <ConnectWithoutContact sx={{ fontSize: "27px", paddingTop: "5px" }} />
    ),
  },
  {
    heading: "Membership",
    icon: <CardMembership sx={{ fontSize: "27px", paddingTop: "5px" }} />,
  },
];
function Sidebar({ profileData }) {
  const windowWidth = useWindowSize();
  return (
    <Card
      elevation={3}
      sx={{
        padding: "32px 32px 32px 20px",
        width: windowWidth < 1200 ? "98%" : "100%",
      }}
    >
      {arrayContent.map((e, i) => (
        <Stack direction={"column"} spacing={1.5} sx={{ mb: 4 }}>
          <Stack direction={"row"} alignItems={"flex-start"} spacing={1.5}>
            {e.icon}
            <Stack direction={"column"}>
              <Typography variant="h3">{e.heading}</Typography>
              <DividerOne>
                <LeftBorder></LeftBorder>
                <RightBorder></RightBorder>
              </DividerOne>
            </Stack>
          </Stack>
          {i === 1 ? (
            <Stack sx={{ pl: 4 }} direction={"row"} spacing={0.5}>
              <IconButton>
                <YouTube />
              </IconButton>
              <IconButton>
                <LinkedIn />
              </IconButton>
              <IconButton>
                <Twitter />
              </IconButton>
            </Stack>
          ) : (
            <>
              {e.heading === "Expertise" &&
                profileData?.experienceSection?.map((e, i) => (
                  <Stack direction={"column"} gap={2} sx={{ pt: 1 }}>
                    <Stack sx={{ pl: 5 }} direction={"column"} spacing={0.5}>
                      <Typography variant="body1">{e.post}</Typography>
                      <Typography
                        sx={{ mb: 1 }}
                        variant="body2"
                        color={"gray"}
                        fontWeight={600}
                      >
                        {e.university}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              {e.heading === "Membership" &&
                profileData?.membershipSection?.map((e, i) => (
                  <Stack direction={"column"} gap={2} sx={{ pt: 1 }}>
                    <Stack sx={{ pl: 5 }} direction={"column"} spacing={0.5}>
                      <Typography variant="body1">{e.title}</Typography>
                      <Typography
                        sx={{ mb: 1 }}
                        variant="body2"
                        color={"gray"}
                        fontWeight={600}
                      >
                        {e.name}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
            </>
          )}
        </Stack>
      ))}
    </Card>
  );
}

export default Sidebar;

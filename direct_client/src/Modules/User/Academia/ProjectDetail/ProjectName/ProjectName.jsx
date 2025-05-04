import {
  styled,
  Avatar,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { customTheme } from "@theme/theme";

const AvatarUpload = styled(Avatar)(() => ({
  width: "170px",
  height: "170px",
  borderRadius: "15px",
}));

const Pstyled = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  fontWeight: "400",
}));

const StatusBadge = styled(Box)(({ theme, status }) => {
  let bgColor;
  switch (status) {
    case "Completed":
      bgColor = theme.palette.success.main;
      break;
    case "In Progress":
      bgColor = theme.palette.warning.main;
      break;
    case "Rejected":
      bgColor = theme.palette.error.main;
      break;
    default:
      bgColor = theme.palette.grey[400];
      break;
  }
  return {
    backgroundColor: bgColor,
    color: theme.palette.common.white,
    borderRadius: "8px",
    padding: "0 8px",
    marginLeft: "10px",
  };
});

function ProjectName({
  value,
  arrayTabs,
  projectData,
  handleChange,
  buttonContent,
  navigationButton,
}) {
  const navigate = useNavigate();

  const handleClickButton = () => {
    if (navigationButton) {
      navigate(`${navigationButton}`);
    }
  };

  return (
    <Card
      sx={{ p: 2, boxShadow: customTheme.palette.boxShadows.boxShadowTable }}
    >
      <Grid container gap={0.5}>
        <Grid item xs={12}>
          <Stack width={"100%"} direction={"row"} gap={2} alignItems="center">
            <AvatarUpload
              src={projectData?.image || "path/to/default/image.jpg"}
              variant="square"
            />
            <IconButton onClick={handleClickButton}>
              <EditIcon />
            </IconButton>
            <Stack
              width={"100%"}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
            >
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h3"
                  fontSize={"24px"}
                  lineHeight={1.5}
                  display={"block"}
                >
                  {projectData?.title || "Default Project Title"}
                </Typography>
                {projectData?.status && (
                  <StatusBadge status={projectData.status}>
                    {projectData.status}
                  </StatusBadge>
                )}
              </Box>
              <Pstyled textAlign={"justify"} variant="body1">
                {projectData?.description || "Default project description."}
              </Pstyled>
            </Stack>
          </Stack>
        </Grid>
        {arrayTabs && (
          <>
            <Grid sx={{ mt: 2 }} item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Tabs
                color={"success"}
                value={value}
                onChange={handleChange}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {arrayTabs.map((e, i) => (
                  <Tab color={"success"} key={i} label={e} />
                ))}
              </Tabs>
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}

export default ProjectName;

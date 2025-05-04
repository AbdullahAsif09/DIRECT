import {
  styled,
  Avatar,
  Card,
  Grid,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { customTheme } from "@theme/theme";
import { useSelector } from "react-redux";
import { keys } from "@config";

const AvatarUpload = styled(Avatar)(({ theme }) => ({
  width: "170px",
  height: "170px",
  borderRadius: "15px",
}));

const Pstyled = styled(Typography)(({ theme }) => ({
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

export function ProjectName({ projectData }) {
  const project = useSelector((state) => state.usr.project);

  return (
    <Card
      sx={{ p: 2, boxShadow: customTheme.palette.boxShadows.boxShadowTable }}
    >
      <Grid container gap={0.5}>
        <Grid item xs={12}>
          <Stack width={"100%"} direction={"row"} gap={2} alignItems="center">
            <AvatarUpload
              src={
                keys.rootserver + project?.image?.[0] ||
                "path/to/default/image.jpg"
              }
              variant="square"
            />
            <Stack
              width={"100%"}
              direction={"column"}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
              gap={1}
            >
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h3"
                  fontSize={"24px"}
                  lineHeight={1.5}
                  display={"block"}
                >
                  {project?.title}
                </Typography>
                <StatusBadge status={project?.ongoing}>
                  {project?.ongoing ? "Ongoing" : "Completed"}{" "}
                </StatusBadge>
              </Box>
              <Pstyled textAlign={"justify"} variant="body1">
                {projectData?.description}
              </Pstyled>
              <Button
                sx={{
                  bgcolor: "#3B4758",
                  color: "#fff",
                  textTransform: "lowercase",
                  padding: "8px 15px",
                  "&:hover": {
                    backgroundColor: "#3B4759",
                  },
                }}
              >
                View More{" "}
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

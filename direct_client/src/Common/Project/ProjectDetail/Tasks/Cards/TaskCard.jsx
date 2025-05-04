import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetRole } from "@hooks";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "#0DA678";
    case "in progress":
      return "#FFA500";
    case "outdated":
      return "#FF0000";
    default:
      return "#000000";
  }
};

const TaskCard = ({
  index,
  logo,
  projectType,
  projectName,
  milestoneId,
  dueDate,
  duration,
  budget,
  discription,
  files,
  progress,
  collaborators,
  status,
}) => {
  const navigate = useNavigate();
  const statusColor = getStatusColor(status);
  const profile = useSelector((state) => state?.profile?.profile);
  const role = useGetRole();

  return (
    <Grid item xs={12} lg={4} md={6}>
      <Card
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "8px",
        }}
      >
        <CardContent sx={{ padding: "15px 8px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            pt={1}
            pb={2}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "3px ",
                borderRadius: "16px",
              }}
            >
              {logo ? (
                <Avatar
                  src={logo}
                  sx={{ width: 30, height: 30, marginRight: 1 }}
                />
              ) : (
                ""
              )}
              <Typography sx={{ fontSize: 15 }}>{projectName}</Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: status ? "blue" : "red",
                color: "#fff",
                padding: "2px 10px",
                borderRadius: "16px",
              }}
            >
              <Typography sx={{ fontSize: 10 }}>
                {status ? status : "Not Started"}
              </Typography>
            </Box> */}
          </Grid>
          <Divider />
          <Grid container direction="column" spacing={2} pt={2} pb={2}>
            <Grid item>
              <Typography sx={{ width: "7%" }} noWrap>
                {discription}
              </Typography>
            </Grid>

            <Grid item>
              <Typography>
                Duration: <strong>{duration}</strong>
              </Typography>
            </Grid>
            {budget ? (
              <Grid item>
                <Typography>
                  Budget: <strong>{budget}</strong>
                </Typography>
              </Grid>
            ) : (
              ""
            )}

            {/* <Grid item>
              <Typography>
                Files: <strong>{files}</strong>
              </Typography>
            </Grid> */}
            <Grid item>
              <Typography>
                Progress: <strong>{progress}%</strong>
              </Typography>
            </Grid>
            <Grid item>
              <LinearProgress
                variant="determinate"
                value={progress ? Number(progress) : 0}
              />
            </Grid>

            {role === "userAgency" ||
              role === "fundingAgency" ||
              (role === "user" && (
                <Grid item xs={12}>
                  <ButtonMui
                    onClick={() =>
                      navigate(`/user/viewmilestone/${milestoneId}?no=${index}`)
                    }
                    variant={"contained"}
                  >
                    View
                  </ButtonMui>
                </Grid>
              ))}
            {role === "industry" && (
              <Grid item xs={12}>
                <ButtonMui
                  onClick={() =>
                    navigate(
                      `/user/industry/viewmilestone/${milestoneId}?no=${index}`
                    )
                  }
                  variant={"contained"}
                >
                  Edit
                </ButtonMui>
              </Grid>
            )}
            {role === "academia" && (
              <Grid item xs={12}>
                <ButtonMui
                  onClick={() =>
                    navigate(
                      `/user/academia/viewmilestone/${milestoneId}?no=${index}`
                    )
                  }
                  variant={"contained"}
                >
                  Edit
                </ButtonMui>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskCard;

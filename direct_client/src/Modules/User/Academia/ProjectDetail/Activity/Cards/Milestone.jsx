import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import SvgIcon from "@mui/icons-material/Image";
import AiIcon from "@mui/icons-material/Brush";
import DocIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/Comment";

const fileIcons = {
  pdf: <PdfIcon sx={{ color: "#D32F2F" }} />,
  svg: <SvgIcon sx={{ color: "#FF9800" }} />,
  ai: <AiIcon sx={{ color: "#FFEB3B" }} />,
  doc: <DocIcon sx={{ color: "#1976D2" }} />,
};

const milestones = [
  {
    time: "16:40",
    user: {
      name: "Ramone Jinga",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    action: "Marked status for",
    task: "Copyright for all pages",
    status: "completed",
    statusColor: "green",
  },
  {
    time: "13:22",
    user: {
      name: "Ramone Jinga",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    action: "Marked status for",
    task: "Implement online booking",
    status: "completed",
    statusColor: "green",
  },
  {
    time: "12:20",
    user: {
      name: "Dobria Steph",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    action: "Uploaded files for task",
    task: "Copyright for all pages",
    files: [
      { type: "pdf", name: "Home page descriptions", size: "20MB" },
      { type: "pdf", name: "Services descriptions", size: "20MB" },
      { type: "ai", name: "Redesigned icons", size: "20MB" },
    ],
  },
  {
    time: "11:45",
    user: {
      name: "Iulian Bîldea",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    action: "Commented on task",
    task: "Implement online booking",
    comment: "Online booking implemented. Check it please!",
  },
];

const MilestoneCard = () => {
  return (
    <Card
      sx={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "8px",
        margin: 2,
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h3" paddingBottom={3} gutterBottom>
          Milestones
        </Typography>
        {milestones.map((milestone, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Typography variant="body2">{milestone.time}</Typography>
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar src={milestone.user.avatar} />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      sx={{ gap: "2px" }}
                      flexDirection={"column"}
                    >
                      <Typography fontWeight={"bold"}>
                        {milestone.user.name}
                      </Typography>

                      <Grid container alignItems={"center"} sx={{ gap: "5px" }}>
                        <Typography> {milestone.action}</Typography>
                        <Typography color="#7DC1FF">
                          {milestone.task}
                        </Typography>
                        task
                        {milestone.status && (
                          <Typography
                            sx={{
                              background: "#0DA678",
                              color: "#fff",
                              fontSize: "10px",
                              borderRadius: "15px",
                              padding: "2px 3px",
                            }}
                          >
                            Completed
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {milestone.files && (
                  <Box
                    sx={{
                      border: "1px dashed black",
                      borderRadius: "8px",
                      padding: 2,
                      marginTop: 1,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      {milestone.files.map((file, index) => (
                        <Grid item key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: 1,
                              borderRadius: "8px",
                              minWidth: 200,
                            }}
                          >
                            {fileIcons[file.type] || (
                              <Avatar>{file.type[0]}</Avatar>
                            )}
                            <Box sx={{ marginLeft: 1 }}>
                              <Typography variant="body2" color="#7DC1FF">
                                {file.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {file.size}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {milestone.comment && (
                  <Box
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      padding: 2,
                      marginTop: 1,
                    }}
                  >
                    <CommentIcon
                      sx={{
                        fontSize: 16,
                        marginRight: 1,
                        verticalAlign: "middle",
                      }}
                    />
                    <Typography variant="body2" component="span">
                      {milestone.comment}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            {index < milestones.length - 1 && <Divider sx={{ marginTop: 2 }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;

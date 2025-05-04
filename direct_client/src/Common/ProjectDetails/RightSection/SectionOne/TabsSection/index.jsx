import {
  AccessTime,
  Analytics,
  AutoStories,
  Description,
  Gavel,
  ScatterPlot,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { ContentData } from "./Data";
import { customTheme } from "@theme/theme";
const TabsStyle = styled(Grid)(({ theme }) => ({}));
const ListCustome = styled(List)(({ theme }) => ({
  width: "100%",
  // border: "1px solid",
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  ["@media screen  and (max-width:899px)"]: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: ".5rem",
    minWidth: "700px",
    overflowX: "auto",
  },
}));
const ListItemCustom = styled(ListItem)(({ theme }) => ({
  borderBottom: "1px solid lightgray",
  paddingTop: "20px",
  ["@media screen  and (max-width:899px)"]: {
    // borderBottom: "none",
  },
}));
const TabContent = styled("div")(({ theme }) => ({
  paddingInline: "20px",
  paddingBlock: "20px",
  marginTop: "1rem",
  // border:"1px solid green",
  minHeight: "300px",
  maxHeight: "400px",
  overflowY: "auto",
}));
const d = [
  {
    name: "Project Duration",
    icon: <AccessTime />,
  },
  {
    name: "Project Process",
    icon: <ScatterPlot />,
  },
  {
    name: "Cost Guidelines",
    icon: <AutoStories />,
  },
  // {
  //   name: "Funding Process",
  //   icon: <Analytics />,
  // },
  {
    name: "Terms & Qualifications",
    icon: <Gavel />,
  },
];
function TabsSection({ data }) {
  const [TabShow, setTabShow] = useState(1);
  return (
    <Grid container justifyContent={"space-between"}>
      <TabsStyle item xs={12} sm={12} md={3.6} lg={3.6}>
        <ListCustome>
          {d.map((e, i) => (
            <ListItemCustom
              key={i}
              disablePadding
              onClick={() => setTabShow(i + 1)}
            >
              <ListItemButton sx={{ paddingInline: "3px" }}>
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText primary={e.name} />
              </ListItemButton>
            </ListItemCustom>
          ))}
        </ListCustome>
      </TabsStyle>
      <Grid item xs={12} sm={12} md={8.4} lg={8.4}>
        {ContentData.map(
          (e, i) =>
            e.key === TabShow &&
            (e.file ? (
              <TabContent key={i}>
                <FilesContent name={e.name} url={e.file} />
              </TabContent>
            ) : (
              <TabContent key={i}>
                <Typography color={"gray"} variant="body1">
                  {/* {data?.terms} */}
                  {e.content}
                </Typography>
              </TabContent>
            ))
        )}
      </Grid>
    </Grid>
  );
}

export default TabsSection;

const FilesContent = ({ url, name }) => {
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: customTheme.palette.boxShadows.boxShadowCardsLight,
      }}
    >
      <Stack
        sx={{ width: "100%" }}
        gap={2}
        direction={"column"}
        alignItems={"flex-start"}
      >
        <Stack direction={"row"} gap={1}>
          <Description />
          <Typography variant="body1">{name}</Typography>
        </Stack>
        <Button href={url} variant={"contained"} size="small">
          View
        </Button>
      </Stack>
    </Card>
  );
};

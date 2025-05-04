import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, styled } from "@mui/material";
import Cards from "../../Cards";
import { Skeletons } from "../../../UI";
import ProposalsList from "./ProposalsList";
import PreAwardFormalities from "./PreAwardFormalities";
import AwardOfContract from "./AwardOfContract";
import FinalContract from "./FinalContract";
import MilestoneTable from "./MillestoneTable";
import CompletedProjects from "./CompletedProjects";
import TypographyMUI from "../../../MUI/TypographyMUI";
const TabListCustome = styled(TabList)(({ theme }) => ({
  // border: "1px solid  rgba(0, 0, 0, 0.51)",
  overflow: "hidden",
  paddingInline: "10px",
  width: "93vw",
  "& .MuiTabList-scrollButtons": {
    background: "green !important",
    color: "green !important",
  },
  "& .MuiTabList-scroller": {
    background: "green !important",
    color: "green !important",
  },
  "& .MuiTabs-indicator": {
    background: "green !important",
    color: "green !important",
  },
  "& .Mui-selected": {
    background: "#F5F8FF",
    color: "green !important",
  },
  [theme.breakpoints.down("xl")]: {
    width: "90vw",
  },
  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
}));
const TabCustome = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  fontSize: "14px",
  letterSpacing: "0.25px",
  textTransform: "capitalize",
  "& .Mui-selected": {
    background: "#F5F8FF",
    color: theme.palette.bg.parrotGreen,
    borderBottomColor: theme.palette.background.parrotGreen,
  },
  // border: "1px solid  rgba(0, 0, 0, 0.51)",
  //   color: "rgba(0, 0, 0, 0.51)",
  "&:hover": {
    background: "#F5F8FF",
  },
}));
function AllTabs({
  TabListCustomeHandleChange,
  handleDeleteProject,
  noProjectsFound,
  tabContextValue,
  dataProject,
  classified,
  TabData,
  filter,
}) {
  const filteredData = dataProject.filter((e) => {
    const lowerTitle = String(e?.title).toLowerCase();
    const lowerFilter = String(filter).toLowerCase();
    const condition = lowerFilter ? lowerTitle?.includes(lowerFilter) : true;
    return condition && e;
  });
  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <Box sx={{ width: "500px", border: "1" }}> */}
        <TabContext value={String(tabContextValue)}>
          <TabListCustome
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="visible arrows tabs example"
            onChange={(e, va) => {
              TabListCustomeHandleChange(va);
            }}
          >
            {TabData.map((e, i) => (
              <TabCustome
                key={i}
                wrapped
                label={e}
                disabled={i === 0 ? false : noProjectsFound ? true : false}
                value={`${i + 1}`}
              />
            ))}
          </TabListCustome>

          <TabPanel sx={{ paddingInline: "0px" }} value={"1"}>
            {noProjectsFound === true || filteredData?.length === 0 ? (
              <TypographyMUI variant={"h3"} sx={{ color: "grey" }}>
                No Projects Found!
              </TypographyMUI>
            ) : dataProject.length !== 0 ? (
              <Cards
                handleDeleteProject={handleDeleteProject}
                cardsData={filteredData}
              />
            ) : (
              <Grid container gap={1}>
                {Array(4)
                  .fill(null)
                  .map((e, i) => (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sm={12}
                      md={5.86}
                      lg={3.85}
                      xl={2.86}
                    >
                      <Skeletons />
                    </Grid>
                  ))}
              </Grid>
            )}
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"2"}>
            {dataProject.length !== 0 && (
              <ProposalsList
                projectDetails={dataProject}
                classified={classified}
              />
            )}
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"3"}>
            <PreAwardFormalities dataProject={dataProject} />
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"4"}>
            <AwardOfContract dataProject={dataProject} />
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"5"}>
            <FinalContract dataProject={dataProject} />
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"6"}>
            <MilestoneTable dataProject={dataProject} />
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"7"}>
            <CompletedProjects dataProject={dataProject} />
          </TabPanel>
          <TabPanel sx={{ paddingInline: "0px" }} value={"8"}>
            <TypographyMUI variant="h1" textAlign={"center"} sx={{ mt: 6 }}>
              Comming Soon!
            </TypographyMUI>
          </TabPanel>
        </TabContext>
        {/* </Box> */}
      </Grid>
    </Grid>
  );
}

export default AllTabs;

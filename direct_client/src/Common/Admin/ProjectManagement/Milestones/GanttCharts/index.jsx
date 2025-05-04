import { Card, Divider, Grid } from "@mui/material";
import { Gantt } from "gantt-task-react";
import ViewSwitcher from "../ViewSwitcher";
import { getStartEndDateForProject, initTasks } from "../Data";
import { useState } from "react";
import { customTheme } from "@theme/theme";

function GanttCharts() {
  const [view, setView] = useState("Day");
  const [tasks, setTasks] = useState(initTasks());
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;

  if (view === "Month") {
    columnWidth = 300;
  } else if (view === "Week") {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    if (!task?.id) {
      return;
    }
    let newTasks = tasks?.map((t) => (t.id === task.id ? task : t));

    if (task?.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks?.find((t) => t.id === task.project);

      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks?.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks?.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    if (!task?.id) {
      return;
    }
    setTasks(tasks?.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDoubleClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {};

  const handleExpanderClick = (task) => {
    if (!task?.id) {
      return;
    }
    setTasks(tasks?.map((t) => (t.id === task.id ? task : t)));
  };

  return (
    <div>
      <Card
        sx={{ p: 3, boxShadow: customTheme.palette.boxShadows.boxShadowTable }}
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <ViewSwitcher onViewModeChange={(viewMode) => setView(viewMode)} />
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Gantt
              tasks={tasks}
              viewMode={view}
              onDateChange={handleTaskChange}
              onDelete={handleTaskDelete}
              onProgressChange={handleProgressChange}
              onDoubleClick={handleDoubleClick}
              onSelect={handleSelect}
              onExpanderClick={handleExpanderClick}
              listCellWidth={isChecked ? "155px" : ""}
              columnWidth={columnWidth}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default GanttCharts;

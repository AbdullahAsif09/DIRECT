import React from 'react'
import TaskHeader from './Header/TaskHeader'
import { Grid } from '@mui/material'
import { taskData } from '../../../../utils/ProjectsData'
import TaskCard from './Cards/TaskCard'
const ProjectTask = () => {
  return (
    <Grid container  pb={5} pt={3}>

       <TaskHeader/>
      <Grid container spacing={2} mt={2}>
        {taskData.map((project, index) => (
          <TaskCard
            key={index}
            status={project.status}
            projectName={project.projectName}
            discription={project.discription}
            dueDate={project.dueDate}
            budget={project.budget}
            files={project.files}
            progress={project.progress}
            collaborators={project.collaborators}
          />
        ))}
      </Grid>
    </Grid>
  )
}

export default ProjectTask
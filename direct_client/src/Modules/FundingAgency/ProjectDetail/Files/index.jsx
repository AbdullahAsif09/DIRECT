import { Grid } from '@mui/material'
import React from 'react'
import FileHeader from './Header/FileHeader'
import AllFiles from './AllFiles/AllFiles'

const ProjectFile = () => {
  return (
    <Grid container pb={5} pt={3}>
     <FileHeader/>
     <AllFiles/>
    </Grid>
  )
}

export default ProjectFile
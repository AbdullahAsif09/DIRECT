import { Grid } from '@mui/material'
import React from 'react'
import MembersHeader from './Header/Header'
import SubAdminCard from './Cards/Card'

const Members = () => {
// Array of dummy data
const adminDataArray = [
    {
      adminPic: "https://randomuser.me/api/portraits/men/45.jpg",
      adminName: "John Doe",
      adminRole: "Senior UX Researcher and UI Designer",
      tasks: 5
    },
    {
      adminPic: "https://randomuser.me/api/portraits/women/45.jpg",
      adminName: "Jane Smith",
      adminRole: "Lead Frontend Developer",
      tasks: 8
    },
    {
      adminPic: "https://randomuser.me/api/portraits/men/46.jpg",
      adminName: "Robert Brown",
      adminRole: "Project Manager",
      tasks: 10
    },
    {
      adminPic: "https://randomuser.me/api/portraits/women/47.jpg",
      adminName: "Emily Davis",
      adminRole: "Backend Developer",
      tasks: 6
    },
    {
      adminPic: "https://randomuser.me/api/portraits/women/46.jpg",
      adminName: "Emily Davis",
      adminRole: "Backend Developer",
      tasks: 6
    },
    {
      adminPic: "https://randomuser.me/api/portraits/men/48.jpg",
      adminName: "Emily Davis",
      adminRole: "Backend Developer",
      tasks: 8
    },
    {
      adminPic: "https://randomuser.me/api/portraits/women/50.jpg",
      adminName: "Emily Davis",
      adminRole: "Backend Developer",
      tasks: 20
    },
    {
      adminPic: "https://randomuser.me/api/portraits/men/51.jpg",
      adminName: "Emily Davis",
      adminRole: "Backend Developer",
      tasks: 0
    }
  ];
  
  return (
   <Grid container pb={5} pt={3}>
      <MembersHeader/>
      <Grid container spacing={2}>
        {adminDataArray.map((admin, index) => (
          <SubAdminCard
            key={index}
            adminPic={admin.adminPic}
            adminName={admin.adminName}
            adminRole={admin.adminRole}
            tasks={admin.tasks}
          />
        ))}
      </Grid>
   </Grid>
  )
}

export default Members
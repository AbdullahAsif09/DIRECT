import {
  cardIcon1,
  cardIcon2,
  cardIcon3,
  cardIcon4,
  cardIcon5,
  cardIcon6,
  cardIcon7,
  cardIcon8,
} from "../../../../public/assets/icons";

function Data(data) {
  const CardData = [
    {
      title: "Created Date",
      description: new Date(data?.createdAt)?.toDateString(),
      // detail: "(completed on Nov 07, 2022)",
      icon: cardIcon1,
      type: "createdAt",
    },
    {
      title: "Total Projects Allotted",
      description: "0",
      // detail: "(spend $5,600.00)",
      icon: cardIcon2,
      type: "total",
    },
    {
      title: "Departments",
      description: "0",
      // detail: "(18 Department listed in this organization)",
      icon: cardIcon3,
      type: "departments",
    },
  ];

  const LastCardsData = [
    // {
    //   title: "Revenue",
    //   description: "Rs 3,500",
    //   detail: +6.5,
    //   duration: "since last month",
    //   icon: cardIcon5,
    // },
    {
      title: "Project Completed",
      description: "34",
      detail: -2.86,
      duration: "since last month",
      icon: cardIcon6,
      type: "completed",
    },
    {
      title: "Project Ongoing",
      description: "44",
      detail: -1.86,
      duration: "since last month",
      icon: cardIcon7,
      type: "ongoing",
    },
    // {
    //   title: "Deprtment with most Alloted Projects",
    //   description: "Dept Name",
    //   detail: -1.86,
    //   duration: "since last month",
    //   icon: cardIcon8,
    // },
    // {
    //   title: "Registered Researchers",
    //   description: "44",
    //   detail: -1.86,
    //   duration: "since last month",
    //   icon: cardIcon4,
    // },
  ];
  return { CardData, LastCardsData };
}

export default Data;

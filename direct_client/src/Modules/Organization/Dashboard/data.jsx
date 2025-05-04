import {
  cardIcon1,
  cardIcon2,
  cardIcon3,
  cardIcon6,
  cardIcon7,
} from "../../../../public/assets/icons";

function Data(data) {
  const CardData = [
    {
      title: "Created Date",
      description: new Date(data?.createdAt)?.toDateString(),
      icon: cardIcon1,
      type: "createdAt",
    },
    {
      title: "Total Projects Allotted",
      description: "0",
      icon: cardIcon2,
      type: "total",
    },
    {
      title: "Departments",
      description: "0",
      icon: cardIcon3,
      type: "departments",
    },
  ];

  const LastCardsData = [
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
  ];
  return { CardData, LastCardsData };
}

export default Data;

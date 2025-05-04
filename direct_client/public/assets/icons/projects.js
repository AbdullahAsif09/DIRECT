const img = "/assets/profile.webp";
const logo1 = "/assets/icons/website.svg";
const logo2 = "/assets/icons/shopify.svg";
const logo3 = "/assets/icons/gmail.svg";
const user1 = "/assets/icons/user1.svg";
const user2 = "/assets/icons/user2.svg";
const user = "/assets/icons/user3.svg";
export const projectData = [
  {
    logo: logo1,
    status: "completed",
    projectType: "website",
    projectName: "Webflow events site opera.gallery",
    dueDate: "Jan 20, 2023",
    budget: "$5,900.00",
    tasks: "46",
    progress: 75,
    collaborators: [user1, user2, user3],
  },
  {
    logo: logo2,
    status: "in progress",
    projectType: "shopping",
    projectName: "Create an e-commerce site for local farmers",
    dueDate: "Feb 15, 2023",
    budget: "$3,200.00",
    tasks: "30",
    progress: 50,
    collaborators: [img, user2, user1],
  },
  {
    logo: logo3,
    status: "completed",
    projectType: "email",
    projectName: "Develop an email marketing campaign ",
    dueDate: "Mar 1, 2023",
    budget: "$1,500.00",
    tasks: "20",
    progress: 90,
    collaborators: [user1, user2],
  },
];

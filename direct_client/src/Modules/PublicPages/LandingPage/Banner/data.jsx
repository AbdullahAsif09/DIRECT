const getimage = (src, flag) => {
  return `/assets/landingbanners/${src}`;
};
export const data = [
  {
    image: getimage("combine_banner.png"),
    title: `Seminar on "Advancing National Security through Indigenous Technology Innovation and Collaboration"/Defence Technologies tentatively on 15th Oct 2023 at NUST`,
    description: `The event is proposed to showcase the technology development capabilities and capacity of the Hi-technology SMEs and Start-ups housed at NSTP. To kick-start a national discourse on indigenization of technologies in an increasingly stringent economic landscape.
Will provide networking opportunity to technology developers, entrepreneurs, policy makers and academicians to find avenues of collaboration for
exchange and flow of knowledge.`,
    type: "blog",
    link: "/blog/Experts are here solve your business problem.",
  },
  {
    image: getimage("airforce.png"),
    title:
      "Launch/Inauguration of NUST R&D Portal, named as DIRECT (Development, Innovation and Research for Cutting Edge Technologies)",
    description: `A
A self-initiative for development of an interactive national-level R&D Portal
Will serve as a platform to link entire for industry-academia collaboration and
innovation.
Enable partners / users to streamline nation-wide call for proposals, online evaluations process
Establishment of comprehensive database of researchers and industry`,
    link: "/scheme/Development of Brake Para",
    type: "scheme",
  },
  {
    image: getimage("marine.png"),
    title: "Call for Proposals - Defence Technologies",
    description: `Proposals are invited on mentioned projects on prescribed template
Sponsored by defence organizations.
Online submission of proposal at given link..`,
    type: "project",
    link: "/project/Pakistan’s indigeous submarine project reaches ‘mega milestone’",
  },
];

export const dataFiles = [
  {
    image: "/assets/icons/pdf.svg",
    title: "Development of Brake Para",
    url: "/pdf/dummy.pdf",
    type: "pdf",
  },
  {
    image: "/assets/icons/pdf.svg",
    title: "Pakistan’s indigenous submarine project",
    url: "/pdf/dummy.pdf",
    type: "pdf",
  },
];


export const notifications = [
  {
    id: 1,
    title: "New Feature Released: Enhanced Dashboard Customization",
    details: `We are thrilled to announce the release of a new feature that allows you to customize your dashboard more intuitively. The updated interface provides a streamlined user experience with drag-and-drop functionality and customizable widgets, enabling you to tailor your dashboard according to your preferences. Explore the new feature and enhance your productivity today!`,
    createdDate: "2024-08-30",
  },
  {
    id: 2,
    title: "Scheduled Maintenance Notification",
    details: `Please be informed that our system will undergo scheduled maintenance on Friday at 2:00 AM UTC. This maintenance is crucial for system upgrades and performance improvements. We recommend saving your work in advance to avoid any data loss. We appreciate your understanding and patience during this downtime.`,
    createdDate: "2024-08-28",
  },
  {
    id: 3,
    title: "New Message from Admin",
    details: `You have received a new message from the administration team. Please check your inbox to read the latest updates and important announcements. If you have any questions or need further assistance, do not hesitate to reach out to our support team.`,
    createdDate: "2024-08-27",
  },
  {
    id: 4,
    title: "Update Available: Version 2.5",
    details: `A new update is now available for your application. Version 2.5 includes several new features, performance enhancements, and bug fixes. Please update to the latest version to take advantage of these improvements and ensure your application runs smoothly. For detailed release notes, visit our update page.`,
    createdDate: "2024-08-26",
  },
  {
    id: 5,
    title: "Weekly Performance Report",
    details: `Your weekly performance report is now available. This report provides a comprehensive overview of your metrics and achievements for the past week. Click the link to view your performance data, analyze trends, and identify areas for improvement. Stay informed and optimize your performance with our detailed reports.`,
    createdDate: "2024-08-25",
  },
];
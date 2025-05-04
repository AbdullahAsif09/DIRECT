const BallImage = "/assets/Project/imageMain.png";
const ProjectImageTwo = "/assets/Project/imageOfSecondTank.png";
const user1 = "/assets/icons/user1.svg";
const user2 = "/assets/icons/user2.svg";
const user3 = "/assets/icons/user3.svg";

export const dataProject = [
  {
    id: 90785643,
    title:
      "Virtual reality training simulator for critical multi-operator vehicle (Indigenous Development of Virtual Reality Simulator Tank VT4)",
    description: `R&D project proposals, including a proposed VR training simulator for VT4 MBT, were presented to VCGS(A) at CGS Sectt, GHQ on 27 Aug 21. After several interactions and discussions, Form DP-10 was initiated by AC Dte in Jan 22. A number of IHDs were then held at AC Dte and SA&amp;MW with NUST Team to finalize the General Staff Requirements. On 22 Apr 22, the GSR was finalized at AC Dte in the presence of DG AC and a draft copy was shared with the PI. 2. Research and Development Establishment (RDE) initiated an IT on 15 Jun 2022 with a much broader GSR having about 35% additional requirements. NUST submitted a technical and financial proposal to execute the project in two phases. In phase 1, 85% of the GSR received with the IT would be covered at a cost of Rs. 37,667,272/-. The phase 2 was proposed to cover the remaining 15% GSR at an estimated cost of Rs. 12,129,430/-. (Copy of Technical and Financial Proposals submitted is attached as Annex A and B respectively.) The proposal to break down the project into two phases was not accepted by RDE and an understanding was achieved that requested additional cost would be allocated to NUST from the budget of the next fiscal year.
      `,
    image: "BallImage",
    startDate: "June 16, 2024",
    endDate: null,
    faqs: {
      data: [
        {
          heading: ` Will there be dedicated applications for the Smart Ball Based Surveillance System in the future?`,
          content: ` Any future dedicated applications will be subject to additional terms and conditions, with details provided upon release.`,
        },
        {
          heading: ` How are modifications and updates handled for the system?`,
          content: ` Modifications and updates may occur to improve system performance. Users are encouraged to stay informed about the latest features and changes.`,
        },
        {
          heading: `What measures are in place for data security and privacy?`,
          content: `Data security and privacy are paramount. Deploying agencies are responsible for adhering to legal and ethical standards in securing and handling collected data.`,
        },
      ],
    },
  },
  {
    id: 90785643,
    title: "Smart Ball Based Surveillance System using AI (BKV-1)",
    description: `Intelligence operations play a vital role in the national security of a country. Law enforcement forces rely on the intelligence reports to conduct operations for preventing terrorist activities. It is important that intelligence reports be accurate and timely. One of the main challenges faced by the law enforcement forces during Surveillance and Reconnaissance missions are the lack of infrastructure for communication and monitoring. Mostly these operations were conducted in remote areas, with no such facilities. Recognizing this need for law enforcement forces and also to address this challenge we proposed a wireless based multi camera imagery device for real-time capturing and transmission of imagery data to a nearly deployed Ad-hoc mobile base station. The proposed solution consists of a software and hardware pipeline for a throwable  ball shaped imaging device, that would be able to capture the high resolution imagery  data using multiple RGB cameras and transmit that data to a base-station. At base  station, the artificial intelligence algorithm will be applied to the imagery data for detecting the person of interest. Using throwable imagery devices for surveillance application will allow law enforcement forces to effectively locate, observe and engage a range of targets in their intelligence, surveillance and reconnaissance (ISR) mission
      ${" "}      
      The envisioned surveillance system represents a cutting-edge integration of hardware and software components designed to significantly bolster the capabilities of law enforcement during Surveillance and Reconnaissance missions. At its core is a throwable, ball-shaped imaging device, meticulously engineered to navigate and capture high-resolution imagery in challenging terrains. The spherical structure, akin to a football in size (approximately 23 cm in diameter), facilitates stable rotation in all directions, ensuring a complete and dynamic field of view. This device houses a sophisticated array of 16 RGB cameras strategically positioned to capture a panoramic perspective. Real-time data transmission to a deployable Ad-hoc mobile base station forms a pivotal aspect of the system, enabling immediate access to critical intelligence reports. The software pipeline integrates artificial intelligence algorithms for the detection of persons of interest, elevating the system beyond mere data collection to actionable insights.
      ${" "}
      In conclusion, this comprehensive surveillance system not only offers a groundbreaking solution to existing challenges in intelligence operations but also lays the foundation for adaptable and scalable advancements in the future. The integration of state-of-the-art technology, user-friendly interfaces, and a forward-looking approach positions this system as a pivotal tool for law enforcement agencies striving for enhanced capabilities in intelligence, surveillance, and reconnaissance missions.
      `,
    image: BallImage,
    startDate: "November 11, 2023",
    endDate: null,
    faqs: {
      data: [
        {
          heading: ` Will there be dedicated applications for the Smart Ball Based Surveillance System in the future?`,
          content: ` Any future dedicated applications will be subject to additional terms and conditions, with details provided upon release.`,
        },
        {
          heading: ` How are modifications and updates handled for the system?`,
          content: ` Modifications and updates may occur to improve system performance. Users are encouraged to stay informed about the latest features and changes.`,
        },
        {
          heading: `What measures are in place for data security and privacy?`,
          content: `Data security and privacy are paramount. Deploying agencies are responsible for adhering to legal and ethical standards in securing and handling collected data.`,
        },
      ],
    },
  },
  {
    id: 90785644,
    title: "Mechanical Mine Field Breaching System",
    description: ``,
    descriptionInHtml: `<h2>Main Task/Requirement / Objective</h2>
    <p>a. Must be capable of clearing APM/ATM (anti-personnel mine/anti-tank mine) all types of mines (pressure actuated shape charge anti-tank mines and inert mines as developed by enemy) with explosive quantity up to 8 kg TNT. Having capability of operating day and night, in all weather conditions.</p>
    <p>b. Must be able to sustain 6-10 blasts of ATMs with explosive quantity up to 8 kg TNT each.</p>

    <h2>Essential and Desirable Parameters</h2>
    <p>a. Must be able to operate in plains desert / semi desert and semi mountainous terrain with effective clearance of 90-95%.</p>
    <p>b. Must be able to provide level-III protection as per STANAG 4569</p>
    <p>c. Man operated chassis for drive of under carriage with communication means (wired / wireless) for remote guidance of driver by the commander who is at a safe distance.</p>
    <p>d. Mineable width of the demining lane shall be at least 3.5 m.</p>
    <p>e. The demining system should have the capability to mark and neutralize the detected mines / UXO.</p>
    <p>f. The demining process should be user friendly and the system should be easy to learn and operate.</p>
    <p>g. The system should be reliable and have minimum downtime during demining operations.</p>
    <p>h. The system should be transportable by C-130 aircraft.</p>
`,
    description: `The primary task at hand involves the development of a demining system that possesses the capability to clear APM/ATM (anti-personnel mine/anti-tank mine) of all types. This includes pressure-actuated shape charge anti-tank mines and inert mines developed by the enemy, with an explosive quantity of up to 8 kg TNT. It should be operational both day and night and in all weather conditions. Additionally, the system should be able to sustain 6-10 blasts of ATMs, each containing an explosive quantity of up to 8 kg TNT.

Moving on to essential and desirable parameters, the system must be designed to operate effectively in plains, desert/semi-desert, and semi-mountainous terrain, ensuring a clearance rate of 90-95%. Level-III protection, following STANAG 4569 standards, is deemed necessary. The chassis should be man-operated for the undercarriage drive, equipped with communication means (wired/wireless) to facilitate remote guidance of the driver by the commander from a safe distance.

The demining lane's mineable width is specified to be at least 3.5 meters. Furthermore, the demining system should possess the capability to mark and neutralize detected mines/UXO. The demining process itself is expected to be user-friendly, ensuring ease of learning and operation. Reliability is a key requirement, with minimal downtime during demining operations.

Lastly, the system must be designed for transportability by C-130 aircraft, emphasizing the importance of logistical considerations in its deployment.
`,
    image: ProjectImageTwo,
    startDate: "December 11, 2023",
    endDate: null,
    faqs: {
      data: [
        {
          heading: `How does the demining system ensure operational effectiveness in different conditions?`,
          content: `The system is designed to operate both day and night and in all weather conditions, emphasizing its versatility and adaptability.`,
        },
        {
          heading: `What is the significance of the 6-10 blasts sustainability requirement for ATMs?`,
          content: `The system is expected to sustain 6-10 blasts of ATMs, each with an explosive quantity of up to 8 kg TNT, showcasing its robustness and durability in challenging scenarios.`,
        },
        {
          heading: `What are the essential and desirable parameters for the demining system?`,
          content: `Parameters include operating effectiveness in various terrains, level-III protection according to STANAG 4569 standards, man-operated chassis with communication means, specified mineable width, and the capability to mark and neutralize detected mines/UXO.`,
        },
        {
          heading: `Why is transportability by C-130 aircraft mentioned as a requirement?`,
          content: `The system must be designed for transportability by C-130 aircraft, highlighting the need for logistical considerations and ease of deployment in various locations.`,
        },
      ],
    },
  },
  //   {
  //     id: 90785643,
  //     title:
  //       "Advance Nickel Alloy coatings for Aerospace applications Synthesis & Characterization",
  //     description: ``,
  //     descriptionInHtml: `<h2>Main Task/Requirement / Objective</h2>
  //     <p>a. Must be capable of clearing APM/ATM (anti-personnel mine/anti-tank mine) all types of mines (pressure actuated shape charge anti-tank mines and inert mines as developed by enemy) with explosive quantity up to 8 kg TNT. Having capability of operating day and night, in all weather conditions.</p>
  //     <p>b. Must be able to sustain 6-10 blasts of ATMs with explosive quantity up to 8 kg TNT each.</p>

  //     <h2>Essential and Desirable Parameters</h2>
  //     <p>a. Must be able to operate in plains desert / semi desert and semi mountainous terrain with effective clearance of 90-95%.</p>
  //     <p>b. Must be able to provide level-III protection as per STANAG 4569</p>
  //     <p>c. Man operated chassis for drive of under carriage with communication means (wired / wireless) for remote guidance of driver by the commander who is at a safe distance.</p>
  //     <p>d. Mineable width of the demining lane shall be at least 3.5 m.</p>
  //     <p>e. The demining system should have the capability to mark and neutralize the detected mines / UXO.</p>
  //     <p>f. The demining process should be user friendly and the system should be easy to learn and operate.</p>
  //     <p>g. The system should be reliable and have minimum downtime during demining operations.</p>
  //     <p>h. The system should be transportable by C-130 aircraft.</p>
  // `,
  //     description: `Functional components exposed to extreme envoirments subject to detoriate and lose their efficiency. Advance and durable metalic coatings are required to implement on such parts. To counter the deterious effects of corrsive envoirments`,
  //     objectives: `
  //     1) A detailed study on already published relavent literature
  //     2) Synthesis of nickle binary alloy coatings e.g. Ni-P, Ni-W, Ni-Co, Ni-B.
  //     3) Charaterization of developed coatings
  //     4) Implemetation on aerospace grade materials
  //      `,
  //     playmentPlan: `
  //     1) A detailed study on already published relavent literature
  //     2) Synthesis of nickle binary alloy coatings e.g. Ni-P, Ni-W, Ni-Co, Ni-B.
  //     3) Charaterization of developed coatings
  //     4) Implemetation on aerospace grade materials
  //      `,
  //     image: ProjectImageTwo,
  //     startDate: "December 11, 2023",
  //     endDate: null,
  //     faqs: {
  //       data: [
  //         {
  //           heading: `How does the demining system ensure operational effectiveness in different conditions?`,
  //           content: `The system is designed to operate both day and night and in all weather conditions, emphasizing its versatility and adaptability.`,
  //         },
  //         {
  //           heading: `What is the significance of the 6-10 blasts sustainability requirement for ATMs?`,
  //           content: `The system is expected to sustain 6-10 blasts of ATMs, each with an explosive quantity of up to 8 kg TNT, showcasing its robustness and durability in challenging scenarios.`,
  //         },
  //         {
  //           heading: `What are the essential and desirable parameters for the demining system?`,
  //           content: `Parameters include operating effectiveness in various terrains, level-III protection according to STANAG 4569 standards, man-operated chassis with communication means, specified mineable width, and the capability to mark and neutralize detected mines/UXO.`,
  //         },
  //         {
  //           heading: `Why is transportability by C-130 aircraft mentioned as a requirement?`,
  //           content: `The system must be designed for transportability by C-130 aircraft, highlighting the need for logistical considerations and ease of deployment in various locations.`,
  //         },
  //       ],
  //     },
  //   },
];

export const TasksProject = [
  {
    id: 1,
    title: "Project Planning and Research",
    progress: 100,
    startDate: "June 30, 2022",
    endDate: "July 30, 2022",
    status: "completed",
    statusColor: "blue",
    description:
      "This initial phase focuses on comprehensive project planning and in-depth research. The team will define the scope and objectives of the surveillance system, outline specific use cases, and conduct thorough research on camera technologies and AI algorithms. The goal is to establish a solid foundation for the project's success.",
    Subtasks: [
      {
        title: "Define Project Scope and Objectives",
        description:
          "Clearly outline the goals and objectives of the surveillance system project.Specify the intended use cases and scenarios for deployment.",
        startDate: "June 30, 2022",
        endDate: "July 10, 2022",
      },
      {
        title: "Research Camera Technologies",
        description:
          "Investigate and finalize the camera technologies (Arducam, OV7670, OV2640, etc.) based on specifications. Determine the number of cameras required for complete 360⁰ coverage.",
        startDate: "July 11, 2022",
        endDate: "July 15, 2022",
      },
      {
        title: "Explore AI Algorithms",
        description:
          "Research and select appropriate AI algorithms for person detection. Consider real-time processing capabilities and compatibility with the chosen hardware.",
        startDate: "July 16, 2022",
        endDate: "July 30, 2022",
      },
    ],
  },
  {
    id: 2,
    title: "Hardware and Prototype Development",
    progress: 100,
    startDate: "August 1, 2022",
    endDate: "September 18, 2022",
    status: "completed",
    statusColor: "blue",
    description:
      "During this stage, the team will transition from planning to the practical development of the hardware and the initial prototype. The focus will be on designing the spherical imaging device, integrating the Inertial Sensor Module (IMU), and selecting and incorporating the chosen cameras. This milestone aims to create a tangible prototype that aligns with the project's technical requirements.",
    Subtasks: [
      {
        title: "Design Spherical Imaging Device",
        description:
          "Develop a design for the throwable, ball-shaped imaging device.Determine the placement and configuration of cameras within the spherical structure.",
        startDate: "August 1, 2022",
        endDate: "August 19, 2022",
      },
      {
        title: "Integrate IMU Unit",
        description:
          "Incorporate an Inertial Sensor Module (IMU) with accelerometers and gyroscopes. Implement logic to identify the optimal time for the ball to be dropped.",
        startDate: "August 20, 2022",

        endDate: "August 30, 2022",
      },
      {
        title: "Camera and Hardware Integration",
        description:
          "Integrate selected cameras with the device. Develop a stable mechanical enclosure, considering gyro stabilization or gimbal for minimizing internal movement..",
        startDate: "August 31, 2022",
        endDate: "September 18, 2022",
      },
    ],
  },
  {
    id: 3,
    title: "Software Development",
    progress: 100,
    startDate: "November 19, 2022",
    endDate: "January 1, 2023",
    status: "completed",
    statusColor: "blue",
    description:
      "The software development phase kicks off with the implementation of the microprocessor or FPGA for efficient communication with multiple cameras. The team will work on developing the image stitching algorithm for creating a panoramic view and ensuring that the software aligns with the hardware specifications. This milestone is crucial for achieving a seamless integration of hardware and software components.",
    Subtasks: [
      {
        title: "Choose Microcontroller or FPGA",
        description:
          "Decide on the appropriate microcontroller or FPGA for multi-threaded application development.",
        startDate: "November 19, 2022",
        endDate: "December 22, 2022",
      },
      {
        title: "Develop Image Stitching Algorithm",
        description:
          "Implement image stitching algorithms to overcome Field of View (FOV) limitations. Test the algorithm's effectiveness in combining images from multiple cameras.",
        startDate: "December 23, 2022",
        endDate: "December 27, 2022",
      },
      {
        title: "Create User Interface",
        description:
          "Develop a user interface for remote control and monitoring. Enable remote adjustments for exposure time, ISO, and white balance.",
        startDate: "December 28, 2022",
        endDate: "January 1, 2023",
      },
    ],
  },
  {
    id: 4,
    title: "Prototype Testing and Refinement",
    progress: 100,
    startDate: "January 2, 2023",
    endDate: "January 25, 2023",
    status: "completed",
    description:
      "With the prototype in hand, this stage involves rigorous testing to evaluate the stability, functionality, and overall performance of the system. Feedback from testing will guide refinements and adjustments to enhance the prototype's capabilities. The goal is to identify and address any issues to ensure the system meets the desired standards.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Prototype Assembly",
        description:
          "Assemble the hardware components into a functional prototype. Test the device's stability, image capture capabilities, and AI algorithms.",
        startDate: "January 2, 2024",
        endDate: "January 6, 2024",
      },
      {
        title: "Wi-Fi Connectivity and Data Transmission",
        description:
          "Implement Wi-Fi connectivity for real-time data transmission. Test the reliability and speed of image data transfer to the base station.",
        startDate: "January 7, 2024",
        endDate: "January 10, 2024",
      },
      {
        title: "User Interface Testing",
        description:
          "Verify the functionality of the user interface on Microsoft Windows and mobile devices. Ensure seamless remote control and monitoring.",
        startDate: "January 7, 2023",
        endDate: "January 10, 2023",
      },
    ],
  },
  {
    id: 5,
    title: "Power Efficiency and Night Vision",
    progress: 100,
    startDate: "February 1, 2023",
    endDate: "March 29, 2023",
    status: "completed",
    statusColor: "none",
    description:
      "This phase centers on addressing power efficiency concerns, given the significant number of cameras in the system. The team will explore solutions to optimize power consumption while maintaining optimal performance. Additionally, night vision capabilities will be incorporated, enhancing the system's functionality in low-light conditions.",
    Subtasks: [
      {
        title: "Optimize Power Consumption",
        description:
          "Address power efficiency concerns due to the high number of cameras. Optimize the device for extended battery life.",
        startDate: "January 11, 2024",
        endDate: "January 15, 2024",
      },
      {
        title: "Night Vision Integration",
        description:
          "Equip cameras with infrared LEDs for night vision capabilities. Test the system's performance in low-light conditions.",
        startDate: "January 16, 2024",
        endDate: "January 20, 2024",
      },
    ],
  },
  {
    id: 6,
    title: "Image Analytics and Finalization",
    progress: 100,
    startDate: "March 3, 2023",
    endDate: "April 12, 2023",
    status: "completed",
    description:
      "During this milestone, the focus shifts to implementing image analytics algorithms at the base station. The team will work on extracting meaningful information from transmitted images, refining the image stitching algorithm, and finalizing the overall system features. This phase is crucial for ensuring the system provides actionable intelligence.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Image Analytics Integration",
        description:
          "Implement image analytics algorithms at the base station. Extract meaningful information from transmitted images for actionable insights.",
        startDate: "January 30, 2024",
        endDate: " February 4, 2024",
      },
      {
        title: "Finalize System Features",
        description:
          "Fine-tune the system based on testing results and user feedback. Ensure the system meets all specified requirements.",
        startDate: " February 5, 2024",
        endDate: " February 12, 2024",
      },
    ],
  },
  {
    id: 7,
    title: "Future Development and Documentation",
    progress: 100,
    startDate: "April 13, 2023",
    endDate: "June 26, 2023",
    status: "completed",
    description:
      "Looking ahead, this milestone involves planning for future upgrades and the development of a dedicated application. The team will also prioritize documentation, creating comprehensive records of the project's hardware and software components, ensuring future maintainability and scalability.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Flexibility for Future Upgrades",
        description:
          "Implement code and hardware design to allow for future upgrades.Ensure the system architecture supports additional requirements.",
        startDate: "February 13, 2024",
        endDate: "February 18, 2024",
      },
      {
        title: "Documentation",
        description:
          "Document the entire project, including hardware specifications, software algorithms, and user instructions. Create a comprehensive user manual for future reference.",
        startDate: "February 19, 2024",
        endDate: "February 26, 2024",
      },
    ],
  },
  {
    id: 8,
    title: "Deployment and Training",
    progress: 100,
    startDate: "July 27, 2023",
    endDate: "August 11, 2023",
    status: "completed",
    description:
      "With a refined and functional system, deployment planning takes center stage. The team will strategize how to roll out the surveillance system, and if necessary, training sessions for end-users or operators will be conducted to ensure effective utilization.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Deployment Planning",
        description:
          "Develop a deployment plan for the surveillance system. Consider training sessions for end-users or operators.",
        startDate: "February 27, 2024",
        endDate: "March 2, 2024",
      },
      {
        title: "Deployment and Evaluation",
        description:
          "Deploy the surveillance system in a controlled environment.Evaluate its performance in real-world scenarios.",
        startDate: "March 3, 2024",
        endDate: "March 11, 2024",
      },
    ],
  },
  {
    id: 9,
    title: "Future Application Development",
    progress: 100,
    startDate: "August 12, 2023",
    endDate: "August 30, 2023",
    status: "completed",
    description:
      "This phase focuses on the development of a dedicated application, providing additional features and functionalities. The team will work on refining the user interface and exploring ways to further enhance the user experience based on feedback and emerging requirements.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Dedicated Application Development",
        description:
          "Consider developing a dedicated application for enhanced user experience. Explore additional features and functionalities.",
        startDate: "March 12, 2024",
        endDate: "March 17, 2024",
      },
      {
        title: "Feedback and Iteration",
        description:
          "Gather feedback from users and stakeholders. Iterate on the system based on practical usage and emerging requirements.",
        startDate: "March 18, 2024",
        endDate: "March 25, 2024",
      },
    ],
  },
  {
    id: 10,
    title: "Final Documentation and Presentation",
    progress: 100,
    startDate: "September 1, 2023",
    endDate: "September 15, 2023",
    status: "completed",
    description:
      "In the final stage, the team will compile comprehensive documentation summarizing the entire project, including hardware specifications, software algorithms, and user instructions. A final presentation will be prepared to showcase the project's features, achievements, and innovations.",
    statusColor: "none",
    Subtasks: [
      {
        title: "Project Summary Documentation",
        description:
          "Compile a final documentation summarizing the entire project. Include details on challenges, solutions, and future recommendations.",
        startDate: "March 26, 2024",
        endDate: "March 31, 2024",
      },
      {
        title: "Presentation",
        description:
          "Prepare a presentation to showcase the project, its features, and achievements. Highlight key milestones and innovations.",
        startDate: "April 1, 2024",
        endDate: "April 2, 2024",
      },
    ],
  },
];
export const TasksProjectTwo = [
  {
    id: 1,
    title: "Mobilization",
    progress: 90,
    startDate: "November 20, 2023",
    endDate: "December 4, 2023",
    status: "in progress",
    statusColor: "blue",
    cost: `20%`,
    description:
      "During this phase, the project team will mobilize resources, including hiring of personnel required to start the project. ",
  },
  {
    id: 2,
    title: "Design and Engineering Phase",
    progress: 50,
    startDate: "December 5, 2023",
    cost: `30%`,
    endDate: "December 18, 2023",
    status: "in progress",
    statusColor: "blue",
    description: `The design and engineering team will create the detailed design and engineering drawings of the System. The milestones for this phase include:
    Completion of design requirements and specifications 
    Completion of 3D CAD modeling and simulation 
    Completion of detailed engineering drawings 
    `,
  },
  {
    id: 3,
    cost: `40%`,
    title: "Manufacturing and Assembly Phase",
    progress: 60,
    startDate: "December 19, 2023",
    endDate: "January 1, 2024",
    status: "in progress",
    statusColor: "blue",
    description: `During this phase, the team will manufacture and assemble the various mechanical components of the FLAIL system. The milestones for this phase include:
    Completion of Aux Power Pack fitting
    Fabrication of FLAIL Mechanism 
    `,
  },
  {
    id: 4,
    title: "Hydraulic Pump, Gearbox including couplings ",
    cost: `10%`,
    progress: 0,
    startDate: "January 2, 2024",
    endDate: "January 15, 2024",
    status: "not started",
    description:
      "The hydraulic pump will generate the necessary pressure which will be driven through Aux Power Pack. The gearbox and couplings will provide the connections. ",
    statusColor: "none",
  },
  {
    id: 5,
    title: "Testing and Commissioning Phase",
    progress: 0,
    cost: `20%`,
    startDate: "January 16, 2024",
    endDate: "January 29, 2024",
    status: "not started",
    statusColor: "none",
    description: `During this phase, the project team will test and commission the system to ensure that it meets the specific requirements of the User. The milestones for this phase include:o	Completion of factory acceptance testing 
    User Test and Trials 
    `,
  },
];

export const TabDetailCards = [
  {
    name: "Due Date",
    title: "September 23, 2023",
    discription: "(completed on time)",
    icon: "/assets/calendarMonth.svg",
  },
  {
    name: "Budget",
    title: "PKR 50,000,000",
    discription: "(spended PKR 50,000,000)",
    icon: "/assets/dollar.svg",
  },
  {
    name: "Tasks",
    title: "8",
    discription: "(8 task completed)",
    icon: "/assets/ccheck.svg",
  },
];

// task card data for task tab card in project detetail section

export const taskData = [
  {
    status: "completed",
    projectName: "Project Planning and Research",
    discription: "Add description for 12 pages + for each of the services",
    dueDate: "July 20, 2022",
    files: "46",
    progress: 100,
    collaborators: [user1, user2, user3],
  },
  {
    status: "completed",
    projectName: "Hardware and Prototype Development",
    discription: "Add description for 12 pages + for each of the services",
    dueDate: "September 10, 2022",
    files: "30",
    progress: 100,
    collaborators: [user1, user2, user1],
  },
  {
    status: "completed",
    projectName: "Software Development",
    discription: "Add description for 12 pages + for each of the services",
    dueDate: "January 20, 2023",
    files: "20",
    progress: 100,
    collaborators: [user1, user2],
  },
  {
    status: "completed",
    projectName: "Prototype Testing and Refinement",
    discription: "Add description for 12 pages + for each of the services",
    dueDate: "March 20, 2023",
    files: "20",
    progress: 100,
    collaborators: [user1, user2],
  },
  {
    status: "completed",
    projectName: "Final Documentation and Presentation",
    discription: "Add description for 12 pages + for each of the services",
    dueDate: "September 23, 2023",
    files: "20",
    progress: 100,
    collaborators: [user1, user2],
  },
];

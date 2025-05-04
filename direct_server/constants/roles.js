module.exports = {
  accessRoles: {
    /*  admin*/
    admins: {
      super: "super",
      projectManager: "projectManager",
      subadmin: "subadmin",
      all: "all",
    },
    /* user */
    users: {
      user: "user",
      academia: "academia",
      industry: "industry",
      all: "all",
    },
    agencies: {
      userAgency: "userAgency",
      fundingagency: "fundingAgency",
      all: "all",
    },
    organizations: {
      organizationAdmin: "organizationAdmin",
      all: "all",
    },
    department: {
      departmentAdmin: "departmentAdmin",
      departmentExecutive: "departmentExecutive",
      departmentProjectManager: "departmentProjectManager",
      all: "all",
    },
    executive: {
      executive: "executive",
      organizationExecutive: "organizationExecutive",
      departmentExecutive: "departmentExecutive",
      all: "all",
    },
  },
};

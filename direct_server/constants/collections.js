const { user, academia, industry } = require("../modals");

const admin = require("../modals/admin/admin");
const departmentMembers = require("../modals/departmentMembers");
const executive = require("../modals/executive");

module.exports = {
  models: {
    fundingAgency: require("../modals/fundingAgency"),
    fundingagency: require("../modals/fundingAgency"),
    FundingAgency: require("../modals/fundingAgency"),
    userAgency: require("../modals/userAgency"),
    useragency: require("../modals/userAgency"),
    organizationAdmin: require("../modals/organizationAdmin"),
    departmentAdmin: require("../modals/departmentMembers"),
    departmentProjectManager: require("../modals/departmentMembers"),
    academia,
    industry,
    user,
    users: user,

    admin: admin,
    super: admin,
    subadmin: admin,
    projectManager: admin,
    webAdmin: admin,
    technicalEvaluator: admin,

    /*  */
    departmentMembers,
    departmentProjectManager: departmentMembers,
    departmentAdmin: departmentMembers,
    organizationAdmin: require("../modals/organizationAdmin"),

    /* executive */
    departmentExecutive: executive,
    organizationExecutive: executive,
    executive: executive,
  },
};

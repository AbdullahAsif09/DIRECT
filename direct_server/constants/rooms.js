const userRoom = "room_user";
const academiaRoom = "room_academia";
const adminRoom = "room_admin";
const industryRoom = "room_industry";
const fundingAgencyRoom = "room_fundingagency";
const userAgencyRoom = "room_UserAgency";
const executiveRoom = "room_executive";
const globalChat = "room_globalChat";
const ROOMS = {
  user: userRoom,
  academia: academiaRoom,
  admin: adminRoom,
  industry: industryRoom,
  fundingagency: fundingAgencyRoom,
  fundingAgency: fundingAgencyRoom,
  userAgency: userAgencyRoom,
  UserAgency: userAgencyRoom,
  executive: executiveRoom,
  globalChat,
};
module.exports = {
  ROOMS,
  roles: {
    admin: ["super", "projectManager", "subadmin"],
    user: ["user"],
    academia: ["academia"],
    industry: ["industry"],
    useragency: ["userAgency"],
    fundingagency: ["fundingAgency"],
    organization: ["organizationAdmin"],
    department: ["departmentAdmin", "departmentProjectManager"],
    executive: ["executive", "organizationExecutive", "departmentExecutive"],
  },
};

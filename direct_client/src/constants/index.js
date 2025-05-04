const ALERT = "ALERT";
const REFETCH_CHATS = "REFETCH_CHATS";

const NEW_ATTACHMENT = "NEW_ATTACHMENT";
const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";

const NEW_REQUEST = "NEW_REQUEST";
const NEW_MESSAGE = "NEW_MESSAGE";

const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const I_AM_ONLINE = "I_AM_ONLINE";
const I_AM_ONLINE_ERROR = "I_AM_ONLINE_ERROR";
const NEW_USER_ONLINE = "NEW_USER_ONLINE";
const USER_OFFLINE = "USER_OFFLINE";

/* global  chat room */
/* GlobalChat */
const Global_IAM_ONLINE = "Global_I_AM_ONLINE";
const Global_IAM_OFFLINE = "Global_IAM_OFFLINE";
const Global_NEW_MESSAGE = "Global_NEW_MESSAGE";
const Global_Enter_Project = "Global_Enter_Project";
const Global_Leave_Project = "Global_Leave_Project";
const Global_IAM_ONLINE_ERROR = "Global_IAM_ONLINE_ERROR";
const Global_Enter_Project_Error = "Global_Enter_Project_Error";
const Global_Leave_Project_Result = "Global_Leave_Project_Result";
const GLOBAL_STOP_TYPING = "GLOBAL_STOP_TYPING";
const GLOBAL_START_TYPING = "GLOBAL_START_TYPING";
const GLOBAL_PROJECT_ONLINE_USERS = "GLOBAL_PROJECT_ONLINE_USERS";
const Global_Join_Project = "Global_Join_Project";
const Global_Join_Project_Error = "Global_Join_Project_Error";
const Globa_Project_Project_Update = "Globa_Project_Project_Update";

const Global_Project_Member_Request_Handler = "Global_Project_Member_Request_Handler";
const Global_Project_Member_Status_Handler = "Global_Project_Member_Status_Handler";
const GLOBAL_CHAT_Action = "GLOBAL_CHAT_Action";

const roles = {
  admin: ["super", "subadmin", "projectManager", "webAdmin", "technicalEvaluator"],
  user: ["user"],
  academia: ["academia"],
  industry: ["industry"],
  useragency: ["userAgency"],
  fundingagency: ["fundingAgency"],
  organization: ["organizationAdmin"],
  department: ["departmentAdmin", "departmentProjectManager"],
  executive: ["executive", "departmentExecutive", "organizationExecutive"],
};
const roleToUrl = {
  users: "/user/",
  user: "/user/",
  super: "/directportal/dashboard/",
  useragency: "/useragency/",
  fundingagency: "/fundingagency/",
  departmentAdmin: "/department/",
  departmentProjectManager: "/department/",
  organizationAdmin: "/organization/",

  organizationExecutive: "/executive/",
  departmentExecutive: "/executive/",
  executive: "/executive/",
};

export {
  ALERT,
  REFETCH_CHATS,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  I_AM_ONLINE,
  I_AM_ONLINE_ERROR,
  NEW_USER_ONLINE,
  USER_OFFLINE,
  Global_NEW_MESSAGE,
  Global_IAM_ONLINE,
  Global_IAM_OFFLINE,
  Global_Enter_Project,
  Global_Leave_Project,
  Global_IAM_ONLINE_ERROR,
  Global_Enter_Project_Error,
  Global_Leave_Project_Result,
  GLOBAL_START_TYPING,
  GLOBAL_STOP_TYPING,
  GLOBAL_PROJECT_ONLINE_USERS,
  Global_Join_Project,
  Global_Join_Project_Error,
  Globa_Project_Project_Update,
  Global_Project_Member_Request_Handler,
  Global_Project_Member_Status_Handler,
  GLOBAL_CHAT_Action,

  /* roles  */
  roles,
  roleToUrl,
};

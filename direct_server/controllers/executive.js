const User = require("../modals/executive");
const Industry = require("../modals/account/industry");
const Academia = require("../modals/account/academia");
const Users = require("../modals/account/user");

const projectsModel = require("../modals/projects");
const departmentsModel = require("../modals/departments");
const organizationModel = require("../modals/organizations");
const departmentsMembersModel = require("../modals/departmentMembers");
const { getToken } = require("../helper/jwtToken");
const { adminVerification, emailVerification } = require("../common/nodemailer");
const { setCookies } = require("../helper/cookie");
const { deleteFile } = require("../helper/deleteFile");
const { deleteDocument } = require("../helper/deleteDocument");
const { throwError } = require("../helper/throwError");
const { accessRoles } = require("../constants/roles");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  try {
    const name = req.body?.name ?? " ";
    const email = req.body?.email;
    const phone = req.body?.phone;
    const password = req.body?.password;

    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      throwError("User already Exist. Choose a Different email", 400);
    }

    if (!name || !email || !phone || !password) {
      throwError("incomplete", "Fill all the fields to proceed", 400);
    }
    const query = {
      email: email,
    };
    if (req.body.organization) {
      query["organization"] = req.body.organization;
    }
    if (req.body.department) {
      query["department"] = req.body.department;
    }

    const oldUser = await User.findOne(query);
    if (oldUser) {
      throwError("User already Exist. Choose a Different email", 400);
    }

    const dataToSend = {
      name: name,
      email: String(email).toLowerCase(),
      phone: phone,
      password: await User.CreateHash(password),
      verification: {
        verified: true,
      },
    };
    if (req.body.organization) {
      dataToSend["organization"] = req.body.organization;
      dataToSend["role"] = accessRoles.executive.organizationExecutive;
    } else if (req.body.department) {
      dataToSend["department"] = req.body.department;
      dataToSend["role"] = accessRoles.executive.departmentExecutive;
    } else {
      dataToSend["role"] = accessRoles.executive.executive;
    }
    if (req.body.image) {
      dataToSend["image"] = req.body.image;
    }
    var user = await User.create(dataToSend);
    // user.email = req.body.email.toLowerCase();

    await emailVerification(user, res, User);
    return res.status(200).json({
      type: "success",
      result: "An email has been sent to registered email address.",
    });
  } catch (error) {
    deleteFile(req.body.image);
    deleteDocument(user, User);
    console.log(error);
    res
      .status(error.code ?? 500)
      .json({ type: "failure", result: error?.message ?? "Server not Responding. Try Again" });
  }
};
exports.getTest = async (req, res) => {
  try {
    const query = {
      email: req.body.email,
    };
    if (req.body.organization) {
      query["organization"] = req.body.organization;
    }
    if (req.body.department) {
      query["department"] = req.body.department;
    }

    const oldUser = await User.findOne(query);

    return res.status(200).json(oldUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);

    var user = await User.findOne({
      $or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.email }],
    });

    if (!user) {
      return res.status(401).json({
        type: "failure",
        result: "Invalid Credentials",
      });
    } else {
      const isEqual = await User.isPasswordEqual(req.body.password, user.password);

      if (isEqual) {
        await adminVerification(user, res);
        return res.status(200).json({ type: "success", result: "Otp sent Successfully" });
      } else {
        res.status(401).json({ type: "failure", result: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.verifyTempOTP = async (req, res) => {
  try {
    var otp = req.body.number;
    console.log(otp);
    const data = await User.findOne({ email: req.body.email.toLowerCase() });

    const now = new Date();
    const temporarycodeOTP = data?.temporarycodeOTP;
    if (now > new Date(temporarycodeOTP.expireTime)) {
      res.status(401).json({ type: "failure", result: "OTP has been expired" });
    } else {
      if (otp === temporarycodeOTP.code) {
        const token = getToken(data, "admin", req);

        setCookies(res, token);

        res.status(200).json({
          type: "success",
          result: "Admin Login Successfully",
          userDetails: {
            ...data._doc,
          },
        });
      } else {
        res.status(401).json({ type: "failure", result: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    console.log("OTP" + req.body.email + req.body.password);

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    user.password = await User.CreateHash(req.body.password);
    user
      .save()
      .then(() => {
        res.status(200).json({
          type: "success",
          result: "Password has been changed",
        });
      })
      .catch((error) => {
        res.status(500).json({ type: "failure", result: "Server Not Responding" });
        return;
      });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.totalIndustries = async (req, res) => {
  try {
    const totalIndustries = await Industry.countDocuments({});
    res.status(200).json({
      success: true,
      totalIndustries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of industries",
      error: error.message,
    });
  }
};
exports.totalAcademia = async (req, res) => {
  try {
    const totalAcademia = await Academia.countDocuments({});
    res.status(200).json({
      success: true,
      totalAcademia,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of industries",
      error: error.message,
    });
  }
};
exports.totalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments({});
    res.status(200).json({
      success: true,
      totalUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of users",
      error: error.message,
    });
  }
};
exports.totalProjects = async (req, res) => {
  try {
    const totalProjects = await projectsModel.countDocuments({});
    res.status(200).json({
      success: true,
      totalProjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of users",
      error: error.message,
    });
  }
};
exports.totalProjectsInprogress = async (req, res) => {
  try {
    const totalProjectsInprogress = await projectsModel.countDocuments({
      milestones: { $exists: true, $not: { $size: 0 } },
    });
    res.status(200).json({
      success: true,
      totalProjectsInprogress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of users",
      error: error.message,
    });
  }
};
exports.totalProjectsCompleted = async (req, res) => {
  try {
    const totalProjects = await projectsModel.countDocuments({
      completed: true,
    });
    res.status(200).json({
      success: true,
      totalProjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the total number of users",
      error: error.message,
    });
  }
};
exports.countProjectsCreatedInMonth = async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

    const result = await projectsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const countsByMonth = Array(12).fill(0);
    result.forEach((item) => {
      countsByMonth[item._id - 1] = item.count;
    });

    const dataToSend = countsByMonth.map((count, index) => ({
      month: months[index],
      projects: count,
    }));

    res.status(200).json({ dataToSend });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while counting projects" });
  }
};
exports.getProjects = async (req, res) => {
  const { id: DepartmentID } = req.params;
  try {
    const projectToSend = await projectsModel
      .find(
        {
          $and: [
            { department: mongoose.Types.ObjectId(DepartmentID) },
            { milestones: { $exists: true, $ne: [] } },
          ],
        },
        {
          image: 1,
          title: 1,
          description: 1,
          createdAt: 1,
          completed: 1,
          milestones: 1,
        }
      )
      .populate("milestones", "details createdAt");
    res.status(200).json({ message: "success", result: projectToSend });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
};
exports.exectiveDashboardDetails = async (req, res) => {
  try {
    // Count total projects
    const totalProjects = await projectsModel.countDocuments();

    // Count total departments
    const totalOrganizations = await organizationModel.countDocuments();

    // Count total completed projects
    const totalCompletedProjects = await projectsModel.countDocuments({
      completed: true,
    });

    res.status(200).json({
      message: "success",
      data: {
        totalProjects,
        totalOrganizations,
        totalCompletedProjects,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.projectsDataByOrganization = async (req, res) => {
  try {
    const projectsData = await projectsModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            organization: "$organization",
          },
          totalProjects: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "organizations", // The collection name of your organizations
          localField: "_id.organization",
          foreignField: "_id",
          as: "organizationDetails",
        },
      },
      {
        $unwind: "$organizationDetails",
      },
      {
        $project: {
          year: "$_id.year",
          organization: "$organizationDetails.name",
          totalProjects: 1,
        },
      },
      {
        $sort: { year: 1 },
      },
    ]);

    res.status(200).json({ message: "success", data: projectsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.executiveDashboardSummaryByOrganization = async (req, res) => {
  const { organizationId } = req.params;

  try {
    // Add organization name
    const OrganizationName = await organizationModel.findById(
      mongoose.Types.ObjectId(organizationId),
      { name: 1 }
    );

    // Count total projects for the organization
    const totalProjects = await projectsModel.countDocuments({
      organization: mongoose.Types.ObjectId(organizationId),
    });

    // Count total departments associated with the organization
    const totalDepartments = await departmentsModel.countDocuments({
      organizationID: mongoose.Types.ObjectId(organizationId),
    });

    // Count total completed projects for the organization
    const totalCompletedProjects = await projectsModel.countDocuments({
      organization: mongoose.Types.ObjectId(organizationId),
      completed: true,
    });

    res.status(200).json({
      message: "success",
      data: {
        totalProjects,
        totalDepartments,
        OrganizationName,
        totalCompletedProjects,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.getOrganizationProjectData = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const projectsData = await projectsModel.aggregate([
      {
        $match: {
          published: true,
          organization: mongoose.Types.ObjectId(organizationId), // Filter by organization ID
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            department: "$department",
          },
          totalProjects: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "departments", // The collection name of your departments
          localField: "_id.department",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: "$departmentDetails",
      },
      {
        $project: {
          year: "$_id.year",
          department: "$departmentDetails.name",
          totalProjects: 1,
        },
      },
      {
        $sort: { year: 1, department: 1 },
      },
    ]);

    res.status(200).json({ message: "success", data: projectsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.getDepartmentOverview = async (req, res) => {
  const { departmentId } = req.params;

  try {
    // Count total admins in the department
    const departmentName = await departmentsModel.findById(departmentId, {
      name: 1,
    });

    // Count total admins in the department
    const totalAdmins = await departmentsMembersModel.countDocuments({
      department: mongoose.Types.ObjectId(departmentId),
      role: { $in: ["departmentAdmin"] }, // Assuming "Admin" is the role for admins
    });

    // Count total projects associated with the department
    const totalProjects = await projectsModel.countDocuments({
      department: mongoose.Types.ObjectId(departmentId),
    });

    // Count total completed projects associated with the department
    const totalCompletedProjects = await projectsModel.countDocuments({
      department: mongoose.Types.ObjectId(departmentId),
      completed: true,
    });

    res.status(200).json({
      message: "success",
      data: {
        totalAdmins,
        totalProjects,
        departmentName,
        totalCompletedProjects,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.getProjectsDataForDepartments = async (req, res) => {
  let { startDate, endDate, departmentId } = req.query;

  // Default to the current year if startDate or endDate are not provided
  const currentYear = new Date().getFullYear();
  if (!startDate) {
    startDate = new Date(`${currentYear}-01-01`);
  } else {
    startDate = new Date(startDate);
  }
  if (!endDate) {
    endDate = new Date(`${currentYear}-12-31`);
  } else {
    endDate = new Date(endDate);
  }

  try {
    const matchConditions = {
      createdAt: { $gte: startDate, $lte: endDate },
    };

    // Add department filter if departmentId is provided
    if (departmentId) {
      matchConditions.department = mongoose.Types.ObjectId(departmentId);
    }

    const projectsData = await projectsModel.aggregate([
      {
        $match: matchConditions,
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          initiatedProjects: {
            $sum: { $cond: [{ $eq: ["$published", true] }, 1, 0] },
          },
          preAwardProjects: {
            $sum: { $cond: [{ $gt: ["$proposalsAmount", 0] }, 1, 0] },
          },
          inProgressProjects: {
            $sum: { $cond: [{ $gt: [{ $size: "$milestones" }, 0] }, 1, 0] },
          },
          completedProjects: {
            $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const result = projectsData.map((item) => ({
      year: item._id.year,
      month: item._id.month,
      initiatedProjects: item.initiatedProjects,
      preAwardProjects: item.preAwardProjects,
      inProgressProjects: item.inProgressProjects,
      completedProjects: item.completedProjects,
    }));

    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.getProjectsOntimeDataForDepartments = async (req, res) => {
  const { departmentID } = req.query;

  if (!departmentID) {
    return res.status(400).json({ error: "departmentID is required" });
  }

  try {
    const yearlyProjectCount = await projectsModel.aggregate([
      {
        $match: {
          department: mongoose.Types.ObjectId(departmentID),
          milestones: { $exists: true, $ne: [] },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          projectCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1 },
      },
    ]);
    res.json({ message: "success", data: yearlyProjectCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while retrieving project counts" });
  }
};

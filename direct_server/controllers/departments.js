const DepartmentModel = require("../modals/departments");
const DepartmentMembersModel = require("../modals/departmentMembers");
const projectModel = require("../modals/projects");
const proposalModel = require("../modals/proposal");
const OrganizationAdminModel = require("../modals/organizationAdmin");
const ExecutiveModel = require("../modals/executive");
const { throwError } = require("../helper/throwError");
const { deleteFile } = require("../helper/deleteFile");
const { deleteDocument } = require("../helper/deleteDocument");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { accessRoles } = require("../constants/roles");
const { getToken } = require("../helper/jwtToken");
const { setCookies } = require("../helper/cookie");
const { adminVerification } = require("../common/nodemailer");
const { ObjectId } = require("mongoose").Types;
/* create organization */
exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name || !body.description) {
      throwError("Missing required fields", 400);
    }
    const roleAndId = getUserRoleAndId(req);
    var newDepartment = new DepartmentModel({
      ...req.body,
      creator: {
        model: roleAndId.model,
        id: roleAndId.userId,
      },
    });
    await newDepartment.save();
    res.status(200).json({
      type: "success",
      result: "Department created",
      department: newDepartment,
    });
  } catch (error) {
    console.log(error, "error");
    // deleteDocument(newDepartment, DepartmentModel);
    deleteFile(req.body.image);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};
exports.addMember = async (req, res, next) => {
  try {
    const body = req.body;
    const role = req.query.role;
    const { name, email, phone, password, department } = body;
    if (!name || !email || !phone || !password || !role) {
      return throwError("Missing required fields", 400);
    }
    if (
      accessRoles.department.departmentAdmin !== role &&
      accessRoles.department.departmentExecutive !== role &&
      accessRoles.department.departmentProjectManager !== role
    ) {
      return throwError("Invalid role", 400);
    }

    const findDepartmentAdmin = await DepartmentMembersModel.findOne({
      $and: [{ department: department }, { role: role }, { email: email }],
    });

    if (findDepartmentAdmin) {
      return res.status(403).json({
        type: "error",
        result: "Department Member already exists",
      });
    }
    const objectToSave = {
      role,
      name,
      email,
      phone,
      password,
      department,
    };
    if (req.body.image) {
      objectToSave["image"] = req.body.image;
    }
    var newMember = await DepartmentMembersModel.create(objectToSave);
    return res.status(200).json({
      type: "success",
      result: "Department Member created",
      department: newMember,
    });
  } catch (error) {
    console.log(error, "error");
    deleteDocument(newMember, DepartmentMembersModel);
    deleteFile(req.body.image);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};
/* edit organization */
exports.edit = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name && !body.image && !body.description && !body.date) {
      throwError("Missing required fields", 400);
    }
    const updateOrganization = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      type: "success",
      result: "Organization created",
      organization: updateOrganization,
    });
  } catch (error) {
    deleteFile(req.body.image);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};
/* get Departments */
exports.getDepartments = async (req, res) => {
  try {
    const organizationId = req.query.id;
    const organization = await DepartmentModel.find({
      organizationID: organizationId,
    }).populate("creator.id");
    res.status(200).json({ type: "success", result: organization });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get Departments getMembers */
exports.getMembers = async (req, res) => {
  try {
    const department = req.params.id;
    const body = req.body;
    const query = { department };
    if (body.memberId) {
      query["_id"] = ObjectId(body.memberId);
    }

    const members = await DepartmentMembersModel.find(query).select(
      "-password -verification -department"
    );
    res.status(200).json({ type: "success", result: members });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

/* get Department Super Admin */
exports.getDepartmentSuperAdmin = async (req, res) => {
  try {
    const departmentId = req.query.id;
    const requiredDepAdmin = await DepartmentMembersModel.findOne(
      {
        department: departmentId,
        role: "departmentAdmin",
      },
      {
        password: 0,
        verification: 0,
      }
    );
    if (!requiredDepAdmin) {
      return res.status(400).json({ type: "error", result: "no admin found" });
    }
    res.status(200).json({ type: "success", result: requiredDepAdmin });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get Department Super Admin */
exports.getDepartmentExecutiveAdmin = async (req, res) => {
  try {
    const departmentId = req.query.id;
    const requiredDepExecutive = await ExecutiveModel.findOne(
      {
        department: departmentId,
        role: "departmentExecutive",
      },
      {
        password: 0,
        verification: 0,
      }
    );
    if (!requiredDepExecutive) {
      return res.status(400).json({ type: "error", result: "no admin found" });
    }
    res.status(200).json({ type: "success", result: requiredDepExecutive });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get organization */
exports.getDepartmentOne = async (req, res) => {
  try {
    const departmentId = req.query.departmentID;
    console.log(departmentId, "departmentId");
    if (!departmentId) {
      return res.status(400).json({ type: "error", result: "no required field found" });
    }
    const requiredDepartment = await DepartmentModel.findById(departmentId).populate("admin");
    if (!requiredDepartment) {
      return res.status(404).json({ type: "error", result: "no department found" });
    }
    res.status(200).json({ type: "success", result: requiredDepartment });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get Departments Projects */
exports.getDepartmentsProjects = async (req, res) => {
  try {
    const departmentId = req.query.id;
    const requiredDepartments = await projectModel
      .find(
        {
          department: departmentId,
        },
        {
          title: 1,
          image: 1,
          fundingAgency: 1,
          userAgency: 1,
          category: 1,
          createdAt: 1,
          usrBy: 1,
          inDraft: 1,
          published: 1,
          completed: 1,
          milestones: 1,
          finalProposalsChosenByAgency: 1,
          initialProposalsChosenByAgency: 1,
          classified: 1,
        }
      )
      .populate("fundingAgency", "name")
      .populate("userAgency", "name")
      .populate("usrBy", "account.name");
    if (!requiredDepartments) {
      return res.status(400).json({ type: "error", result: "No Projects Found" });
    }
    res.status(200).json({ type: "success", result: requiredDepartments });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get Departments Projects Count */
exports.getDepartmentsProjectsCount = async (req, res) => {
  try {
    const departmentId = req.query.id;
    const projectCount = await projectModel.countDocuments({
      department: departmentId,
    });
    if (!projectCount) {
      return res.status(400).json({ type: "error", result: "No Projects Found" });
    }
    res.status(200).json({ type: "success", result: projectCount });
  } catch (error) {
    console.log(error.message + " error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get Projects Created in the Last Year */
exports.getDepartmentYearlyProjects = async (req, res) => {
  try {
    // const departmentId = req.query.id;
    const departmentId = ObjectId(req.query.id);
    console.log(departmentId, "department");
    // Get the current date and time
    const currentDate = new Date();
    // Get the date 12 months before the current date
    const lastYearDate = new Date(currentDate);
    lastYearDate.setFullYear(currentDate.getFullYear() - 1);
    // Aggregation to group projects by month and count them
    const monthlyProjects = await projectModel.aggregate([
      {
        $match: {
          department: departmentId,
          createdAt: { $gte: lastYearDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.status(200).json({ type: "success", result: monthlyProjects });
  } catch (error) {
    console.log(error.message + " error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* list of verified organizations */
exports.list = async (req, res) => {
  try {
    const organizations = await DepartmentModel.find().select();
    res.status(200).json({ type: "success", result: organizations });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.removeOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Missing required field", 400);
    const organization = await DepartmentModel.findByIdAndDelete(id);
    if (!organization) throwError("Organization not found", 404);
    const organizations = await DepartmentModel.find();
    res.status(200).json({ type: "success", result: "Organization deleted", organizations });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({
      type: "failure",
      result: error.message ?? "Server Not Responding",
    });
  }
};
/* remove of organization admin */
exports.removeOrganizationAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Missing required field", 400);
    const organization = await DepartmentModel.findById(id);
    if (!organization) throwError("Organization not found", 404);
    if (!organization.admin) throwError("Organization admin not found", 404);
    /* remove organization.admin reference */
    const adminDeletion = OrganizationAdminModel.findByIdAndDelete(organization.admin);
    organization.admin = null;
    const savedOrganization = await organization.save();
    await adminDeletion;
    res.status(200).json({
      type: "success",
      result: "Organization deleted",
      organization: savedOrganization,
    });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({
      type: "failure",
      result: error.message ?? "Server Not Responding",
    });
  }
};

/* login member */
exports.login = async (req, res) => {
  try {
    var user = await DepartmentMembersModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.email }],
    });

    if (!user) {
      res.status(401).json({
        type: "failure",
        result: "Invalid Credentials",
      });
    } else {
      const isEqual = await DepartmentMembersModel.isPasswordEqual(
        req.body.password,
        user.password
      );

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

/* verify temp otp */
exports.verifyTempOTP = async (req, res) => {
  try {
    var data = await DepartmentMembersModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    var otp = req.body.number;

    const now = new Date();
    const temporarycodeOTP = data?.temporarycodeOTP;
    console.log(data, temporarycodeOTP);

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

/* project milestone */
exports.getProjectMilestones = async (req, res) => {
  try {
    const { projectID } = req.body;
    // Step 1: Fetch the project with proposals
    const project = await projectModel.findById(projectID, {
      finalProposalsChosenByAgency: 1,
    });

    // Check if project exists
    if (!project) {
      return res.status(400).json({
        type: "failure",
        result: "no project found",
      });
    }

    // Step 2: Manually populate each proposal
    let reqData = [];
    for (let proposalId of project.finalProposalsChosenByAgency) {
      const proposal = await proposalModel
        .findById(proposalId, {
          proposalText: 0,
          testing: 0,
          financialProposal: 0,
        })
        .populate("submittedBy.id", "name")
        .populate("milestones", "startDate endDate"); // Fetch each proposal
      reqData.push(proposal);
    }
    return res.status(200).json({ message: "success", result: reqData });
  } catch (error) {
    console.log(error);
  }
};

const projectModel = require("../modals/projects");
const { accessRoles } = require("../constants/roles");
const { deleteFile } = require("../helper/deleteFile");
const { throwError } = require("../helper/throwError");
const departmentsModel = require("../modals/departments");
const OrganizationModel = require("../modals/organizations");
const { deleteDocument } = require("../helper/deleteDocument");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const OrganizationAdminModel = require("../modals/organizationAdmin");

/* create organization */
exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name || !body.image || !body.description) {
      throwError("Missing required fields", 400);
    }
    var newOrganization = new OrganizationModel(req.body);
    await newOrganization.save();
    res.status(200).json({
      type: "success",
      result: "Organization created",
      organization: newOrganization,
    });
  } catch (error) {
    deleteDocument(newOrganization, OrganizationModel);
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

    const updateOrganization = await OrganizationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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

/* get all organization */
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await OrganizationModel.find(
      {},
      { password: 0, description: 0, date: 0 }
    );
    res.status(200).json({ type: "success", result: organizations });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

/* get organization */
exports.getOrganization = async (req, res) => {
  try {
    const organizationId = req.params.id;
    const userId = req.query.id;

    if (!organizationId || !userId) throwError("Missing required field", 400);
    const idAndRole = getUserRoleAndId(req);
    if (idAndRole.role == accessRoles.organizations.organizationAdmin) {
      if (userId !== idAndRole.userId) {
        throwError("Unauthorized access", 403);
      }
    }
    const organization = await OrganizationModel.findById(
      organizationId
    ).populate("admin", "name email image");
    res.status(200).json({ type: "success", result: organization });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* get organization */
exports.getOrganizationStats = async (req, res) => {
  try {
    const { id: organizationId } = req.params;
    const { id: userId } = req.query;

    if (!organizationId || !userId) {
      return res
        .status(400)
        .json({ type: "failure", message: "Missing required field" });
    }

    const { userId: currentUserId, role } = getUserRoleAndId(req);

    if (
      role === accessRoles.organizations.organizationAdmin &&
      userId !== currentUserId
    ) {
      return res
        .status(403)
        .json({ type: "failure", message: "Unauthorized access" });
    }

    // Fetch organization details with populated admin info and related projects
    const [organization, projects, departments] = await Promise.all([
      OrganizationModel.findById(organizationId).populate(
        "admin",
        "name email image"
      ),
      projectModel.find({ organization: organizationId }),
      departmentsModel.find({ organizationID: organizationId }).count(),
    ]);

    if (!organization) {
      return res
        .status(404)
        .json({ type: "failure", message: "Organization not found" });
    }

    // Count the number of ongoing and completed projects
    const projectStats = projects.reduce(
      (acc, project) => {
        if (project.published && !project.completed) {
          acc.ongoing += 1;
        } else if (project.completed) {
          acc.completed += 1;
        }
        return acc;
      },
      { ongoing: 0, completed: 0 }
    );
    projectStats["total"] = projects.length;
    projectStats["departments"] = departments;
    projectStats["createdAt"] = new Date(
      organization?.createdAt
    )?.toDateString();

    res
      .status(200)
      .json({ type: "success", result: organization, projects: projectStats });
  } catch (error) {
    console.error("Error fetching organization stats:", error.message);
    res.status(500).json({ type: "failure", message: "Server Not Responding" });
  }
};

/* get Organization Projects */
exports.getOrganizationProjects = async (req, res) => {
  try {
    const userId = req.params.id;
    const organizationID = req.query.organizationID;
    if (!userId) throwError("Missing required field", 400);
    const idAndRole = getUserRoleAndId(req);
    if (idAndRole.role == accessRoles.organizations.organizationAdmin) {
      if (userId !== idAndRole.userId) {
        throwError("Unauthorized access", 403);
      }
    }
    const requiredOrganization = await projectModel
      .find(
        {
          organization: organizationID,
        },
        { title: 1, image: 1, milestones: 1, department: 1 }
      )
      .populate("department", "name")
      .populate("organization", "name")
      .populate("milestones", "details");
    res.status(200).json({ type: "success", result: requiredOrganization });
  } catch (error) {
    console.log(error.message + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

/* list of verified organizations */
exports.list = async (req, res) => {
  try {
    const organizations = await OrganizationModel.find().select();
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
    const organization = await OrganizationModel.findByIdAndDelete(id);
    if (!organization) throwError("Organization not found", 404);
    const organizations = await OrganizationModel.find();
    res
      .status(200)
      .json({ type: "success", result: "Organization deleted", organizations });
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

    const organization = await OrganizationModel.findById(id);
    if (!organization) throwError("Organization not found", 404);
    if (!organization.admin) throwError("Organization admin not found", 404);

    /* remove organization.admin reference */
    const adminDeletion = OrganizationAdminModel.findByIdAndDelete(
      organization.admin
    );
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

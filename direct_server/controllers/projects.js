const projects = require("../modals/projects");
const ChatRoom = require("../modals/chatroom/chat");
const { compareDocs } = require("../middlewares/CompareDocsForMulter");
const { default: mongoose } = require("mongoose");
const { locaFunctioncreatePublicGroupChat } = require("./chat");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { throwError } = require("../helper/throwError");
const { getBodyParserForFormData } = require("../helper/getBodyParserForFormData");
const { deleteFile } = require("../helper/deleteFile");
const { processHtmlFields } = require("../helper/projectsHelper");
const { deleteDirectory } = require("../helper/deleteDirectory");
const { isValidId } = require("../helper/mongodbIdCheck");

// using helper functions

const CreateProject = async (DataToSave) => {
  const project = new projects(DataToSave);
  const savedProject = await project.save();
  return savedProject;
};

// using controller functions

exports.addproject = async (req, res) => {
  try {
    getBodyParserForFormData(req);

    const data = await processHtmlFields(req.body, req);

    const { userProjectDetailsSubmittor, ...rest } = data;

    // if there is funding and user agency
    if (req.body?.fundingAgency && req.body?.userAgency) {
      let fundingAgencyArray = [];
      let userAgencyArray = [];
      fundingAgencyArray.push(req.body?.fundingAgency);
      userAgencyArray.push(req.body?.userAgency);
      const DataToSave = {
        image: req.images,
        uploadFile: req.documents,
        fundingAgency: fundingAgencyArray,
        userAgency: userAgencyArray,
        ...rest,
        id: req.id,
      };
      const createdProject = await CreateProject(DataToSave);
      if (createdProject) {
        return res.status(200).json({ type: "success", result: createdProject });
      }
    }

    // if there is userProjectDetailsSubmittor
    if (userProjectDetailsSubmittor) {
      let usrBy = [];
      usrBy.push(userProjectDetailsSubmittor);
      let DataToSave = {
        image: req.images,
        uploadFile: req.documents,
        usrBy: usrBy,
        ...rest,
        id: req.id,
      };
      const createdProject = await CreateProject(DataToSave);

      if (createdProject) {
        return res.status(200).json({ type: "success", result: createdProject });
      }
    }

    // if there is no funding and user agency and userProjectDetailsSubmittor
    if (!req.body?.fundingAgency && !req.body?.userAgency) {
      const { fundingAgency, userAgency, ...restData } = DataToSave;
      const createdProject = new projects({ ...restData });
      const savedProject = await createdProject.save();
      if (savedProject) {
        return res.status(200).json({ type: "success", result: savedProject });
      }
    }
  } catch (error) {
    console.log(error);
    if (req.images) {
      req.images.forEach((image) => deleteFile(image));
    }
    return res.status(500).json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};
exports.updateproject = async (req, res) => {
  try {
    getBodyParserForFormData(req);
    const data = await processHtmlFields(req.body, req);
    const { reqId, image, document, uploadFilesAll, inDraft, department, organization, ...rest } =
      data;
    const { id } = req.query;

    if (isValidId(department)) rest["department"] = department;
    if (isValidId(organization)) rest["organization"] = organization;

    const projectToFind = await projects.findOne({ _id: id });
    if (projectToFind) {
      const compareDocsData = await compareDocs(uploadFilesAll, projectToFind.uploadFile);
      // console.log(compareDocsData, "compareDocsData");
      if (compareDocsData?.length > 0) {
        let finalArray = [];
        if (req.documents) {
          finalArray = req.documents.concat(compareDocsData);
        } else {
          finalArray = req.documents;
        }
        // console.log(req.documents, "req.documents");
        const updateProject = await projects.updateOne(
          { _id: id },
          {
            $set: {
              image: req.images,
              uploadFile: finalArray,
              inDraft: inDraft,
              ...rest,
            },
          }
        );
        return res.status(200).json({ type: "success", result: updateProject });
      } else {
        const updateProject = await projects.updateOne(
          { _id: id },
          {
            $set: {
              image: req.images,
              inDraft: inDraft,
              uploadFile: req.documents,
              ...rest,
            },
          }
        );
        return res.status(200).json({ type: "success", result: updateProject });
      }
    }
    return res.status(404).json({ type: "error", result: "project not found" });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server not Responding. Try Again" });
    console.log(error.message);
  }
};
exports.updateProjectManger = async (req, res) => {
  try {
    const { _id, assignedTo } = req.body;
    if (!assignedTo || !_id || !Array.isArray(assignedTo) || assignedTo?.length === 0) {
      throwError("invalid request", 400);
    }
    const projectToFind = await projects.findById({ _id });
    if (projectToFind) {
      const updateProject = await projects
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              assignedTo,
            },
          },
          { new: true } // This returns the updated document
        )
        .populate("usrBy", "account.name")
        .populate("userAgency", "name")
        .populate("fundingAgency", "name")
        .populate("assignedTo", "firstName lastName _id");
      return res.status(200).json({ type: "success", result: updateProject });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};
exports.getprojects = async (req, res) => {
  try {
    const project = await projects.find({});
    res.status(201).json({ type: "success", result: project });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getProjectsForUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const project = await projects.find({
      published: true,
      visibleToUserIds: { $elemMatch: { id: userId } },
    });
    if (project.length > 0) {
      res.status(200).json({ type: "success", result: project });
    } else {
      res.status(404).send("No projects found for the given user ID.");
    }
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getProjectsUnclassified = async (req, res) => {
  try {
    const project = await projects.find({ classified: false, published: true });
    if (project.length === 0) {
      return res.status(200).json({ type: "success", result: "no projects found" });
    }
    return res.status(201).json({ type: "success", result: project });
  } catch (error) {
    return res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getProjectsInDraft = async (req, res) => {
  try {
    const project = await projects.find(
      { inDraft: true },
      { title: 1, description: 1, _id: 1, inDraft: 1 }
    );
    if (project.length > 0) {
      res.status(200).json({
        type: "success",
        message: "projects",
        result: project,
      });
    }
    if (project.length < 1) {
      res.status(200).json({
        type: "success",
        message: "no project found",
        result: "no project found",
      });
    }
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.deleteproject = async (req, res) => {
  try {
    const { id, classified, published, inDraft } = req.body;
    if (!id) {
      throwError("Invalid request", 400);
    }
    const query = {};
    if (classified) query.classified = classified;
    if (published) query.published = published;
    if (inDraft) query.inDraft = inDraft;

    const project = await projects.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ type: "failure", result: "Project Not Found!" });
    }
    const all = await projects.find(query);
    console.log(project.id);

    deleteDirectory(`uploads/projects/${project.id}`);
    deleteDirectory(`uploads/proposal/${project.id}`);
    res.status(200).json({ type: "success", result: all });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      type: "failure",
      result: error.message ?? "Server Not Responding",
    });
  }
};
exports.getprojectone = async (req, res) => {
  try {
    const { id } = req.query;
    const project = await projects
      .findOne({ _id: id })
      .populate("fundingAgency", "-password -Role -projects")
      .populate("userAgency", "-password -Role -projects")
      .populate("usrBy", "-password -Role -projects")
      .populate("assignedTo", "firstName lastName _id")
      .populate("department", "-password")
      .populate("organization", "-password");
    if (project) return res.status(200).json({ type: "success", result: project });
    res.status(404).json({ type: "failure", result: "Project Not Found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.publishproject = async (req, res) => {
  try {
    const { id } = req.query;
    const project = await projects.findByIdAndUpdate(id, { published: true }, { new: true });
    if (project) {
      await locaFunctioncreatePublicGroupChat(project);

      res.status(201).json({ type: "success", result: project });
    } else {
      res.status(500).json({ type: "failure", result: "Server Not Responding" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "failure",
      result: "Server Not Responding",
      errorMessage: error.message,
    });
  }
};
exports.updateProjectDraft = async (req, res) => {
  try {
    const { id, classifiedValue } = req.query;
    const project = await projects.findByIdAndUpdate(
      id,
      { classified: classifiedValue, inDraft: false, published: true },
      { new: true }
    );
    if (project) {
      res.status(201).json({ type: "success", result: project });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "failure",
      result: "Server Not Responding",
      errorMessage: error.message,
    });
  }
};
exports.getPublishedProjects = async (req, res) => {
  const { classified } = req.body;
  const roleAndId = getUserRoleAndId(req);
  const query =
    roleAndId.role === "super"
      ? {
          classified,
          published: true,
        }
      : {
          classified,
          published: true,
          assignedTo: {
            $in: [roleAndId.userId],
          },
        };

  try {
    const projectArray = await projects
      .find(query, {
        _id: 1,
        image: 1,
        title: 1,
        createdAt: 1,
        userAgency: 1,
        milestones: 1,
        description: 1,
        fundingAgency: 1,
        applicationField: 1,
        proposalsAmount: 1,
        userAgency: 1,
        usrBy: 1,
        initialProposalsChosenByAgency: 1,
        finalProposalsChosenByAgency: 1,
      })
      .populate("usrBy", "account.name")
      .populate("userAgency", "name")
      .populate("fundingAgency", "name")
      .populate("assignedTo", "firstName lastName _id");

    if (projectArray.length < 1) {
      return res.status(200).json({
        type: "success",
        message: "No Projects Found",
        result: "No Projects Found",
      });
    }
    res.status(200).json({
      type: "success",
      message: "Projects are found successfully",
      result: projectArray,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getProjectForReviewer = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const projectInfo = await projects.findById(id, {
      availableForProposals: 0,
      classified: 0,
      uploadFile: 0,
      createdAt: 0,
      updatedAt: 0,
      upDatedBy: 0,
      published: 0,
      inDraft: 0,
      testing: 0,
    });
    if (!projectInfo) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "success", result: projectInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Project not found || internal error" });
  }
};
exports.getProjectsForFundingAgency = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (!id) {
    return res.status(404).json({ message: "Funding Agency Id not found" });
  }
  try {
    const projectInfo = await projects.find(
      { fundingAgency: id },
      {
        title: 1,
        createdAt: 1,
        published: 1,
      }
    );
    if (!projectInfo) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "success", result: projectInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Project not found || internal error" });
  }
};
exports.getProjectsForUserAgency = async (req, res) => {
  if (!req.authId) {
    return res.status(404).json({ message: "User Agency Id not found" });
  }
  try {
    const projectInfo = await projects.aggregate([
      // Match the documents where userAgency array contains req.authId
      {
        $match: {
          userAgency: mongoose.Types.ObjectId(req.authId),
        },
      },

      // Sort the documents by createdAt
      { $sort: { createdAt: 1 } },

      // Add a field with a sequential id
      {
        $group: {
          _id: null,
          docs: { $push: "$$ROOT" },
        },
      },

      {
        $addFields: {
          docs: {
            $map: {
              input: { $range: [0, { $size: "$docs" }] },
              as: "index",
              in: {
                $mergeObjects: [
                  { $arrayElemAt: ["$docs", "$$index"] },
                  { id: { $add: ["$$index", 1] } },
                ],
              },
            },
          },
        },
      },

      // Unwind the array to process each document individually
      { $unwind: "$docs" },

      // Replace root to bring back to document structure
      {
        $replaceRoot: { newRoot: "$docs" },
      },

      // Project the fields you need
      {
        $project: {
          id: 1,
          title: 1,
          createdAt: 1,
          published: 1,
          ongoing: 1,
        },
      },
    ]);

    console.log(projectInfo);

    if (!projectInfo || projectInfo.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "success", result: projectInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Project not found || internal error" });
  }
};
exports.getmembers = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "Id not found" });

  try {
    const data = await ChatRoom.findOne({ project: id }).populate({
      path: "members.id",
      select: "firstName lastName name _id",
    });
    if (!data) {
      return res.status(404).json({ message: "Project members not found" });
    }
    return res.status(200).json({
      message: "success",
      result: data.members.map((e) => {
        return {
          ...e.id._doc,
          model: e.model,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Project not found || internal error" });
  }
};
exports.sendProjectsForViewingDetials = async (req, res) => {
  try {
    const { projectID, userIDs } = req.body;
    const updateProjects = await projects.findByIdAndUpdate(
      projectID,
      { $push: { visibleToUserIds: { $each: userIDs } } },
      { new: true }
    );
    if (!updateProjects) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "success", result: updateProjects });
  } catch (error) {
    console.log(error);
  }
};

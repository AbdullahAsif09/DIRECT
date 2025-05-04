const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const ProjectComments = require("../modals/projectComments");
const { throwError } = require("../helper/throwError");
const Project = require("../modals/projects");

/* get project comments */

exports.getComments = async (req, res, next) => {
  try {
    const project = req.params.id;
    if (!project) throwError("No project id provided", 400);

    const comments = await fetchComments(project);
    return res.status(201).json({ type: "success", result: comments });
  } catch (error) {
    return res
      .status(error.code ?? 500)
      .json({ type: "failure", result: error.message ?? "Server Not responding" });
  }
};

/* send project comment */
exports.addComment = async (req, res, next) => {
  try {
    const idAndRole = getUserRoleAndId(req);
    const project = req.params.id;
    const content = req.body.content;

    if (!project) throwError("No project id provided", 400);
    if (!content) throwError("Comment content is required", 400);

    const findProject = await Project.findById(project);
    if (!findProject) throwError("Project not found", 404);

    /* add new comment */
    const newComment = new ProjectComments({
      project,
      sender: {
        id: idAndRole.userId,
        model: idAndRole.model,
      },
      content: content,
    });
    await newComment.save();
    /* get updated comments */
    const comments = await fetchComments(project);
    return res.status(201).json({ type: "success", result: comments });
  } catch (error) {
    console.error(error.messages);
    return res
      .status(error.code ?? 500)
      .json({ type: "failure", result: error.message ?? "Server Not responding" });
  }
};

const fetchComments = async (projectId) => {
  const comments = await ProjectComments.find({ project: projectId })
    // .sort({ createdAt: -1 })
    .limit(100)
    .populate({
      path: "sender.id",
      select: "firstName lastName name _id",
    })
    .lean()
    .sort({ $natural: -1 });
  return comments;
};

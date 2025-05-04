const projects = require("../modals/projects");
exports.getProjectId = async (req, res, next) => {
  try {
    const { projectID } = req.query;
    const findProject = await projects.findById(projectID, { id: 1 });
    if (!findProject) {
      return res.status(400).json({
        message: "Project not found",
      });
    }
    req.id = findProject?.id;
    next();
    return;
  } catch (e) {
    console.log(e);
  }
};

const projects = require("../modals/projects");
const { ObjectId } = require("mongodb");
exports.seProjectId = async (req, res, next) => {
  try {
    const newId = new ObjectId();
    await projects.countDocuments({});
    req.id = "direct_pr_" + newId.toString();

    next(); // Call the next middleware in the chain
    return;
  } catch (e) {
    console.log(e);
  }
};

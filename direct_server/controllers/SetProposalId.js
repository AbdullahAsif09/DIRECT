const { ObjectId } = require("mongodb");
const proposal = require("../modals/proposal");
exports.setPropsoalId = async (req, res, next) => {
  try {
    const newId = new ObjectId();
    await proposal.countDocuments({});
    req.id = "direct_pr_" + newId.toString();

    next(); // Call the next middleware in the chain
    return;
  } catch (e) {
    console.log(e);
  }
};

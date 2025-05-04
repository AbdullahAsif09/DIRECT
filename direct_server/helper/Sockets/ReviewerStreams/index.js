const proposalModel = require("../../../modals/proposal");
// let isRunning = false;
const ReviewerWatchProjectAssign = async (assignments, socket) => {
  //  if (isRunning) {
  //    return;
  //  }

  //  isRunning = true;
  // return console.log(assignments, "proposals");
  try {
    let proposals = await proposalModel
      .findOne(
        { _id: { $in: assignments?.proposalId } },
        { proposalText: 0, financialProposal: 0, testing: 0 }
      )
      .populate({ path: "projectID", select: "title" })
      .populate({ path: "submittedBy.id", select: "companyName" });

    proposals.submissionDate = assignments.submissionDate;
    if (proposals) {
      return socket.emit("watchProposalAssignToReviewer", proposals);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // isRunning = false;
  }
};
module.exports = { ReviewerWatchProjectAssign };

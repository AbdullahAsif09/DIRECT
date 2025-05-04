const eventEmitter = require("../../emitter");
const proposal = require("../../modals/proposal");
const WatchStreamsProposal = () => {
  proposal
    .watch([], {
      fullDocument: "updateLookup",
    })
    .on("change", (change) => {
      if (change.operationType === "insert") {
      }
      if (change.operationType === "update") {
        handleSendToAgency(change);
      }
    });
};
module.exports = { WatchStreamsProposal };

//**
//**
// fetchData
//**
//**
const fetchData = async (change) => {
  try {
    const populatedProposal = await proposal
      .findById(change.fullDocument._id, {
        financialProposal: 0,
        testing: 0,
        proposalText: 0,
      })
      .populate("submittedBy.id", "firstName lastName");
    if (populatedProposal) {
      return populatedProposal;
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSendToAgency = async (proposal) => {
  console.log(proposal.updateDescription.updatedFields.sendToAgency);
  const response = await fetchData(proposal);
  if (!response) return;
  //********
  // send through emitter
  //*********
  if (proposal.updateDescription.updatedFields.sendToAgency === true) {
    eventEmitter.emit("proposalSendToAgency", response);
  }
  if (
    proposal.updateDescription.updatedFields.awardedDocs ||
    proposal.updateDescription.updatedFields.contractedDocs
  ) {
    const { _id, projectID, awardedDocs, contractedDocs } =
      proposal.fullDocument;
    eventEmitter.emit("updatedProposalSendToAgency", {
      _id,
      projectID,
      awardedDocs,
      contractedDocs,
    });
  }
};

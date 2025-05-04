const roles = require("../../../modals/roles");
const admin = require("../../../modals/admin/admin");
const project = require("../../../modals/projects");
const { academia, industry } = require("../../../modals");
const proposal = require("../../../modals/proposal");
const userAgency = require("../../../modals/userAgency");
const fundingAgency = require("../../../modals/fundingAgency");
const { handleRoleChange } = require("../../../helper/Sockets/Streams");

let changeStreams = {};

const WatchStreams = async (socket) => {
  if (!changeStreams.proposal) {
    changeStreams.proposal = proposal.watch([], {
      fullDocument: "updateLookup",
    });
    watchProposals(socket);
  }
  if (!changeStreams.project) {
    changeStreams.project = project.watch([], { fullDocument: "updateLookup" });
    watchProjects(socket);
  }
  if (!changeStreams.roles) {
    changeStreams.roles = [
      admin.watch([], { fullDocument: "updateLookup" }),
      industry.watch([], { fullDocument: "updateLookup" }),
      academia.watch([], { fullDocument: "updateLookup" }),
      userAgency.watch([], { fullDocument: "updateLookup" }),
      fundingAgency.watch([], { fullDocument: "updateLookup" }),
    ];
    watchRoles(socket);
  }
};

const watchProposals = (socket) => {
  const changeStream = changeStreams.proposal;

  changeStream.on("change", async (data) => {
    switch (data.operationType) {
      case "insert":
        socket.emit(
          "newProposalCreated",
          extractProposalData(data.fullDocument)
        );
        break;
      case "update":
        const updatedFields = data.updateDescription.updatedFields;
        if (
          updatedFields.reviewByReviewer ||
          updatedFields.sendToUserAgency ||
          updatedFields.sendToFundingAgency
        ) {
          socket.emit(
            "updatedProposalOverView",
            extractProposalData(data.fullDocument)
          );
        } else if (updatedFields.reviewByReviewer) {
          socket.emit("emitFeedbackProposal", {
            _id: data.fullDocument._id,
            createdAt: data.fullDocument.createdAt,
            submittedBy: data.fullDocument.submittedBy,
            reviewByReviewer: updatedFields.reviewByReviewer,
          });
        }
        break;
    }
  });
};

const watchProjects = (socket) => {
  const changeStream = changeStreams.project;

  changeStream.on("change", async (data) => {
    if (data.updateDescription.updatedFields.proposalsAmount) {
      socket.emit(
        "proposalAmountChanged",
        extractProjectData(data.fullDocument)
      );
    }
  });
};

const watchRoles = (socket) => {
  changeStreams.roles.forEach((stream, index) => {
    stream.on("change", async (data) => {
      handleRoleChange(stream, socket, getRoleEventName(index), roles);
    });
  });
};

const extractProposalData = (doc) => {
  return {
    _id: doc._id,
    createdAt: doc.createdAt,
    assignedTo: doc.assignedTo,
    submittedBy: doc.submittedBy,
    reviewByReviewer: doc.reviewByReviewer,
    sendToUserAgency: doc.sendToUserAgency,
    sendToFundingAgency: doc.sendToFundingAgency,
  };
};

const extractProjectData = (doc) => {
  return {
    _id: doc._id,
    image: doc.image,
    title: doc.title,
    createdAt: doc.createdAt,
    userAgency: doc.userAgency,
    description: doc.description,
    fundingAgency: doc.fundingAgency,
    applicationField: doc.applicationField,
    proposalsAmount: doc.proposalsAmount,
  };
};

const getRoleEventName = (index) => {
  const roleEventNames = [
    "emitStreamAdminRoleChange",
    "emitStreamIndustryRoleChange",
    "emitStreamAcademiaRoleChange",
    "emitStreamUserAgencyRoleChange",
    "emitStreamFundingAgencyRoleChange",
  ];
  return roleEventNames[index];
};

module.exports = WatchStreams;

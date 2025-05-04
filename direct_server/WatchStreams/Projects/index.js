const eventEmitter = require("../../emitter");
const projects = require("../../modals/projects");
const WatchStreamsProjects = () => {
  // project watch Streams
  projects
    .watch([], {
      fullDocument: "updateLookup",
    })
    .on("change", (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "delete"
      ) {
        emitTotalProjects();
      }
      if (change.operationType === "insert") {
        const { fundingAgency, userAgency, usrBy } = change.fullDocument;
        if (usrBy?.length > 0) {
          eventEmitter.emit("newProjectEmitterUser", change.fullDocument);
        }
        if (fundingAgency?.length > 0 && userAgency?.length > 0) {
          eventEmitter.emit("newProjectEmitterAgency", change.fullDocument);
        }
        eventEmitter.emit("newProjectEmitterAdmin", change.fullDocument);
      }
      if (change.operationType === "update") {
        const { fundingAgency, userAgency, usrBy, proposalsAmount } =
          change.fullDocument;
        eventEmitter.emit("updatedProjectsEmitterAdmin", change.fullDocument);
        if (change.updateDescription.updatedFields?.proposalsAmount > 0) {
          eventEmitter.emit("updatedProjectEmitterAdmin", change.fullDocument);
        }
        if (
          change.updateDescription.updatedFields?.initialProposalsChosenByAgency
        ) {
          eventEmitter.emit(
            "updatedProjectInitialContractEmitter",
            change.fullDocument
          );
        }
        if (
          change.updateDescription.updatedFields?.finalProposalsChosenByAgency
        ) {
          eventEmitter.emit(
            "updatedProjectFinalContractEmitterAdmin",
            change.fullDocument
          );
        }
        if (proposalsAmount > 0 && usrBy?.length > 0) {
          eventEmitter.emit("updatedProjectEmitterUser", change.fullDocument);
        }
        if (
          proposalsAmount > 0 &&
          fundingAgency?.length > 0 &&
          userAgency?.length > 0
        ) {
          eventEmitter.emit("updatedProjectEmitterAgency", change.fullDocument);
        }
      }
    });
};
module.exports = { WatchStreamsProjects };
async function emitTotalProjects() {
  try {
    const totalProjects = await projects.countDocuments({});
    eventEmitter.emit("updateTotalProjects", { totalProjects });
  } catch (error) {
    console.log("Error emitting total industries:", error.message);
  }
}

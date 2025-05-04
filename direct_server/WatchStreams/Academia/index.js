const eventEmitter = require("../../emitter");
const academia = require("../../modals/account/academia");
const WatchStreamsAcademia = () => {
  // project watch Streams
  academia
    .watch([], {
      fullDocument: "updateLookup",
    })
    .on("change", (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "delete"
      ) {
        emitTotalAcademia();
      }
    });
};
module.exports = { WatchStreamsAcademia };

async function emitTotalAcademia() {
  try {
    const totalAcademia = await academia.countDocuments({});
    eventEmitter.emit("updateTotalAcademia", { totalAcademia });
  } catch (error) {
    console.log("Error emitting total industries:", error.message);
  }
}

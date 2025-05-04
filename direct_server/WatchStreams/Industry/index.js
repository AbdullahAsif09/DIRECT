const eventEmitter = require("../../emitter");
const industry = require("../../modals/account/industry");
const WatchStreamsIndustry = () => {
  // project watch Streams
  industry
    .watch([], {
      fullDocument: "updateLookup",
    })
    .on("change", (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "delete"
      ) {
        emitTotalIndustries();
      }
    });
};
module.exports = { WatchStreamsIndustry };

async function emitTotalIndustries() {
  try {
    const totalIndustries = await industry.countDocuments({});
    eventEmitter.emit("updateTotalIndustries", { totalIndustries });
  } catch (error) {
    console.log("Error emitting total industries:", error.message);
  }
}

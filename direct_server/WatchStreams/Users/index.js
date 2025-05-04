const eventEmitter = require("../../emitter");
const users = require("../../modals/account/user");
const WatchStreamsUsers = () => {
  // project watch Streams
  users
    .watch([], {
      fullDocument: "updateLookup",
    })
    .on("change", (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "delete"
      ) {
        emitTotalUsers();
      }
    });
};
module.exports = { WatchStreamsUsers };

async function emitTotalUsers() {
  try {
    const totalUsers = await users.countDocuments({});
    eventEmitter.emit("updateTotalUsers", { totalUsers });
  } catch (error) {
    console.log("Error emitting total industries:", error.message);
  }
}

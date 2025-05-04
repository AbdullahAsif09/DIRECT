const handleRoleChange = (changeStream, socket, emitEventName, modelName) => {
  changeStream.on("change", async (newData) => {
    if (newData.operationType === "update") {
      const updatedFields = newData.updateDescription.updatedFields;
      if (updatedFields?.Role == null || updatedFields?.Role == undefined) {
        const { _id, Role } = newData.fullDocument;
        socket.emit(`${emitEventName}`, {
          _id: _id,
          Role: Role,
        });
        return;
      }
      if (updatedFields?.Role) {
        const { _id, Role } = newData.fullDocument;
        const RoleName = await modelName.findById(Role);
        if (RoleName?.roleName === "reviewer") {
          socket.emit(`${emitEventName}`, { _id, Role });
        }
      }
    }
  });
};
module.exports = { handleRoleChange };

// const eventEmitter = require("../emitter");

class rolesController {
  constructor(
    industry,
    academia,
    fundingAgency,
    userAgency,
    admin,
    reviewer,
    roles,
    mongoose
  ) {
    this.fundingagency = fundingAgency;
    this.useragency = userAgency;
    this.industry = industry;
    this.academia = academia;
    this.reviewer = reviewer;
    this.mongoose = mongoose;
    this.admin = admin;
    this.roles = roles;
  }

  // helpers
  async assignRoleAndCreateReviewer(
    modelType,
    userID,
    userUpdate,
    reviewerCreate,
    session
  ) {
    const stringModelType = modelType.toString();
    const roleAssigned = await this[stringModelType].findByIdAndUpdate(
      userID,
      userUpdate,
      { new: true, session }
    );
    if (!roleAssigned) {
      throw new Error("User not found");
    }

    const reviewerCreated = await this.reviewer.create([reviewerCreate], {
      session,
    });
    if (!reviewerCreated) {
      throw new Error("Reviewer not created");
    }

    return { user: roleAssigned, reviewerDetails: reviewerCreated };
  }
  async removeRoleAndDeleteReviewer(modelType, userID, session) {
    console.log(modelType, "modelType");
    console.log(userID, "userID");
    const reviewerDeleted = await this.reviewer.deleteOne(
      {
        "userID.id": userID,
      },
      { session }
    );
    if (reviewerDeleted?.deletedCount === 0) {
      throw new Error("Reviewer not found");
    }
    const roleRemoved = await this[modelType].findByIdAndUpdate(
      userID,
      {
        Role: null,
      },
      { new: true, session }
    );
    if (!roleRemoved) {
      throw new Error("User not found");
    }
    return { user: roleRemoved, reviewerDetails: reviewerDeleted };
  }
  // functions of API

  async create(req, res) {
    try {
      const { roleName, adminRole } = req.body;
      if (!roleName) {
        return res.status(400).json({ message: "Role Name is required" });
      }
      if (!adminRole) {
        const rolesCreated = await this.roles.create({
          roleName: roleName,
          adminRole: adminRole,
        });
        return res.status(200).json({
          message: "role has been created",
          result: rolesCreated,
        });
      }
      const rolesCreated = await this.roles.create({
        roleName: roleName,
      });
      // eventEmitter.emit("roleCreated", rolesCreated);
      // eventEmitter.off("roleCreated", rolesCreated);
      return res.status(200).json({ message: "success", result: rolesCreated });
    } catch (error) {
      console.log(error);
    }
  }

  async assignResearcher(req, res) {
    const session = await this.mongoose.startSession();
    session.startTransaction();
    try {
      const { _id, type } = req.body;
      if (!req.body?._id || !req.body?.email || !req.body?.type) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const roleToAssign = await this.roles.findOne({ roleName: "reviewer" });
      if (!roleToAssign) {
        return res.status(400).json({ message: "Role not found" });
      }

      const userUpdate = { Role: roleToAssign._id };
      const modelType = ["admin", "super"].includes(type) ? "admin" : type;
      const reviewerCreate = {
        userID: { id: req.body?._id, model: modelType },
        email: req.body?.email,
        type: req.body?.type,
        name: req.body?.name
          ? req.body?.name
          : `${req.body?.firstName} ${req.body?.lastName}`,
        category: [
          "Artificial Intelligence",
          "Data Sciences",
          "Cloud Computing",
        ],
      };

      if (
        [
          "industry",
          "academia",
          "admin",
          "super",
          "fundingagency",
          "useragency",
        ].includes(type)
      ) {
        const result = await this.assignRoleAndCreateReviewer(
          modelType,
          req.body?._id,
          userUpdate,
          reviewerCreate,
          session
        );
        await session.commitTransaction();
        // eventEmitter.emit("reviewerAssigned", result);
        return res
          .status(200)
          .json({ message: "User is reviewer now!", result });
      }

      return res.status(400).json({ message: "Invalid request" });
    } catch (error) {
      console.log(error);
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    } finally {
      session.endSession();
    }
  }

  async removeResearcher(req, res) {
    const session = await this.mongoose.startSession();
    session.startTransaction();
    try {
      const { userID, userType } = req.body;
      if (!userID || !userType) {
        return res.status(400).json({ message: "needed fields are missing" });
      }
      if (
        [
          "industry",
          "academia",
          "admin",
          "super",
          "fundingagency",
          "useragency",
        ].includes(userType)
      ) {
        const result = await this.removeRoleAndDeleteReviewer(
          userType,
          userID,
          session
        );
        await session.commitTransaction();
        // eventEmitter.emit("reviewerRemoved", result);
        return res
          .status(200)
          .json({ message: "User is not reviewer now!", result });
      }
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      console.log(error);
      return res.status(500).json({ message: "internal error!" });
    } finally {
      session.endSession();
    }
  }
}
module.exports = rolesController;

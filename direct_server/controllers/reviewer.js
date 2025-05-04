// const academia = require("../modals/academia");
// const admin = require("../modals/admin");
// const industry = require("../modals/industry");

class ReviewerController {
  constructor(
    admin,
    industry,
    academia,
    proposal,
    project,
    reviewer,
    mongoose,
    userAgency,
    fundingAgency
  ) {
    this.adminModel = admin;
    this.industryModel = industry;
    this.academiaModel = academia;
    this.proposalModel = proposal;
    this.projectModel = project;
    this.reviewerModel = reviewer;
    this.mongooseModel = mongoose;
    this.userAgencyModel = userAgency;
    this.fundingAgencyModel = fundingAgency;
  }

  async findAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchQuery = req.query.search || "";
    const searchCategory = req.query.category || "";
    let query = {
      $and: [{ name: { $regex: new RegExp("^" + searchQuery, "i") } }],
    };
    if (searchCategory !== "None") {
      query.$and.push({
        category: { $regex: new RegExp("^" + searchCategory, "i") },
      });
    }
    try {
      const reviewerResult = await this.reviewerModel
        .find(query, { createdAt: 1, userID: 1 })
        .populate(
          "userID.id",
          "name firstName lastName email category currentUniversity companyName"
        );
      if (!reviewerResult) {
        return res.status(404).json({ message: "Reviewer not found" });
      }
      return res.status(200).json({
        message: "success",
        result: reviewerResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
  async findAllProposals(req, res) {
    const { id: queryId } = req.body;
    console.log(queryId, "queryId");
    if (!queryId) {
      return res.status(400).json({ message: "no ID found" });
    }
    try {
      await this.proposalModel
        .find(
          {
            assignedTo: {
              $elemMatch: {
                "reviewerID.id": this.mongooseModel.Types.ObjectId(queryId),
              },
            },
          },
          {
            _id: 1,
            projectID: 1,
            assignedTo: 1,
            reviewByReviewer: 1,
            submittedBy: 1,
            createdAt: 1,
          }
        )
        .populate({ path: "projectID", select: "title" })
        .populate({ path: "submittedBy.id", select: "name" })
        .exec((err, documents) => {
          if (err) {
            console.error("Error populating data:", err);
            res.status(404).json({ message: "data not found" });
          } else {
            console.log(
              "Documents with populated submittedBy.id field:",
              documents
            );
            return res
              .status(200)
              .json({ message: "success", result: documents });
          }
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
  async findProjectProposals(req, res) {
    const { userID, projectID } = req.body;
    console.log(userID, "userID");
    console.log(projectID, "projectID");
    if (!userID || !projectID) {
      return res.status(400).json({ message: "no ID found" });
    }
    try {
      await this.proposalModel
        .find(
          {
            projectID: this.mongooseModel.Types.ObjectId(projectID),
            assignedTo: {
              $elemMatch: {
                "reviewerID.id": this.mongooseModel.Types.ObjectId(userID),
              },
            },
          },
          {
            _id: 1,
            projectID: 1,
            assignedTo: 1,
            reviewByReviewer: 1,
            submittedBy: 1,
            createdAt: 1,
          }
        )
        .populate({ path: "projectID", select: "title" })
        .populate({ path: "submittedBy.id", select: "name" })
        .exec((err, documents) => {
          if (err) {
            console.error("Error populating data:", err);
            res.status(404).json({ message: "data not found" });
          } else {
            return res
              .status(200)
              .json({ message: "success", result: documents });
          }
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }

  async verifyReviewer(req, res) {
    try {
      const { id } = req.body;
      console.log(id, "id");
      const reviewer = await this.reviewerModel.findOne({ "userID.id": id });
      if (!reviewer) {
        return res.status(404).json({ message: "Reviewer not found" });
      }
      res.status(200).json({ message: "success", result: reviewer });
    } catch (error) {
      console.log(error);
    }
  }
  // async findAllProposals(req, res) {
  //   const { proposalId } = req.body;
  //   console.log(proposalId, "proposalId");
  //   try {
  //     await this.proposalModel.findByIdAndUpdate(proposalId);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "internal error" });
  //   }
  // }
}

module.exports = { ReviewerController };

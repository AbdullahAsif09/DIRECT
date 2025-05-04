const moment = require("moment");
const { LocalFuncioncreateMileStoneChat } = require("./chat");
const {
  getBodyParserForFormData,
} = require("../helper/getBodyParserForFormData");
const {
  processHtmlFieldsForProposals,
} = require("../helper/projectsHelper/extractAndAddImages");
const { throwError } = require("../helper/throwError");

class ProposalController {
  constructor(
    proposal,
    projects,
    proposalAssignment,
    mongoose,
    fs,
    milesstones
  ) {
    this.mongoose = mongoose;
    this.proposalModel = proposal;
    this.projectsModel = projects;
    this.proposalAssignment = proposalAssignment;
    this.fs = fs;
    this.milestones = milesstones;
  }
  async compareMilestones(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((obj1, index) => {
      const obj2 = arr2[index];
      return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
    });
  }
  async create(req, res) {
    const { title, description, author } = req.body;
    const proposal = await this.proposal.create({ title, description, author });
    return proposal;
  }
  async getProposal(req, res) {
    const { id } = req.body;
    console.log({ id });
    try {
      const proposal = await this.proposalModel
        .findById(id, {
          sendToFundingAgency: 0,
          sendToUserAgency: 0,
          reviewByReviewer: 0,
        })
        .populate("milestones", "details");
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res.status(200).json({ message: "success", result: proposal });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async getProposalForFeedback(req, res) {
    const { id } = req.body;
    let restructureProposalData = [];
    let restructureProposalFile = [];
    let proposalMilestones = [];
    try {
      const proposal = await this.proposalModel
        .findById(id, {
          sendToFundingAgency: 0,
          sendToUserAgency: 0,
          reviewByReviewer: 0,
        })
        .populate("milestones", "details");
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      if (proposal?.proposalText) {
        restructureProposalData = Object.entries(proposal?.proposalText).map(
          ([e, i]) => {
            return {
              heading: e,
              content: i,
              feedback: null,
              rating: null,
            };
          }
        );
        console.log(restructureProposalData);
      }
      if (proposal?.proposalfile) {
        proposal?.proposalfile.push({ rating: null, feedback: null });
        restructureProposalFile = proposal?.proposalfile;
      }
      if (proposal?.milestones?.details?.length > 0) {
        proposalMilestones = proposal?.milestones?.details;
      }
      const dataToReturn = {
        proposalMilestones: proposalMilestones,
        proposalText: restructureProposalData,
        proposalfile: restructureProposalFile,
        projectID: proposal?.projectID,
      };
      return res.status(200).json({
        type: "success",
        message: "success",
        result: dataToReturn,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async getProposalInfo(req, res) {
    const { id } = req.query;
    try {
      const proposal = await this.proposalModel
        .find(
          { projectID: id },
          {
            proposalText: 0,
            proposalfile: 0,
            testing: 0,
            financialProposal: 0,
          }
        )
        .populate({ path: "submittedBy.id", select: "name" });
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res.status(200).json({ message: "success", result: proposal });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async getProposalValues(req, res) {
    const { id } = req.query;
    console.log(id);
    try {
      const proposal = await this.projectsModel.findById(id, {
        uploadFile: 1,
        testing: 1,
        financialProposal: 1,
        proposalText: 1,
        proposalfile: 1,
      });
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res.status(200).json({ message: "success", result: proposal });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async updateProjectProposalAmount(req, res, id) {
    try {
      const updatedProject = await this.projectsModel.findByIdAndUpdate(id, {
        $inc: { proposalsAmount: 1 },
      });
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      if (updatedProject) {
        return updatedProject;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async submitProposal(req, res) {
    const { id } = req.query;
    getBodyParserForFormData(req);
    try {
      const milesstonesData = await this.milestones.create({
        details: req.body?.milestonesData,
      });
      if (!milesstonesData) {
        return res.status(404).json({ message: "Milestones not found" });
      }
      const project = await this.projectsModel.findById(id);
      if (!project) {
        return res
          .status(403)
          .json({ message: "error", result: "no project found" });
      }
      const data = await processHtmlFieldsForProposals(
        req.body,
        req,
        req.body.proposalText,
        project?.id
      );
      const { proposalText } = data;
      const proposalCreate = await this.proposalModel.create({
        projectID: id,
        proposalText: proposalText ?? [],
        submittedBy: req?.body?.submittedBy,
        proposalfile: req?.documents,
        usrBy: project?.usrBy[0],
        milestones: milesstonesData?._id,
        totalAmount: req?.body?.TotalAmount,
      });
      if (proposalCreate) {
        const project = this.updateProjectProposalAmount(req, res, id);
        if (project) {
          return res
            .status(201)
            .json({ message: "success", result: { proposalCreate } });
        }
      }
      return res;
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async reSubmitProposal(req, res) {
    const { projectID, proposalID } = req.query;
    const data = await processHtmlFieldsForProposals(
      req.body,
      req,
      req.body.proposalText,
      projectID
    );
    const { proposalText } = data;
    try {
      getBodyParserForFormData(req);
      const existingProposal = await this.proposalModel
        .findById(proposalID)
        .populate("milestones", "details");
      if (!existingProposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      existingProposal.oldMilestones = existingProposal?.milesstones;
      existingProposal.oldProposalText = existingProposal?.proposalText;
      existingProposal.oldProposalfile = existingProposal?.proposalfile;
      const isMilestoneEqual = this.compareMilestones(
        existingProposal?.milestones?.details,
        req.body?.milestones
      );
      if (isMilestoneEqual === false) {
        const milesstonesData = await this.milestones.create({
          details: req.body?.milestones,
        });
        if (!milesstonesData) {
          return res.status(404).json({ message: "Milestones not found" });
        }
        existingProposal.milestones = milesstonesData?._id;
      }
      existingProposal.proposalText = proposalText;
      await existingProposal.save();
      return res
        .status(200)
        .json({ message: "success", result: { existingProposal } });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Proposal not found || internal error" });
    }
  }
  async getProposalForReview(req, res) {
    const { id: reviewerId } = req.body;
    console.log(reviewerId);
    try {
      const proposalsForReview = await this.proposalModel.find({
        assignedTo: reviewerId,
      });

      return res
        .status(200)
        .json({ message: "success", result: proposalsForReview });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "error", result: "internal error!!!" });
    }
  }
  async getProjectInfoForReviewer(req, res) {
    const { id } = req.query;
    try {
      const project = await this.projectsModel.findById(id, {
        availableForProposals: 0,
        classified: 0,
        uploadFile: 0,
        createdAt: 0,
        updatedAt: 0,
        upDatedBy: 0,
        published: 0,
        inDraft: 0,
        testing: 0,
      });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", result: project });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Project not found || internal error" });
    }
  }
  async assignProposalToReviewer(req, res) {
    try {
      const assignments = req.body.data;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      for (let assignment of assignments) {
        const submissionDateObject = new Date(assignment.submissionDate);
        submissionDateObject.setHours(0, 0, 0, 0);

        if (submissionDateObject <= currentDate) {
          return res
            .status(400)
            .json({ message: "Submission date must be in the future" });
        }
      }
      const assignProposals = await this.proposalModel.findByIdAndUpdate(
        req.body?.proposalId,
        {
          $push: { assignedTo: { $each: assignments } },
        },
        { new: true }
      );
      if (!assignProposals) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res
        .status(201)
        .json({ message: "success", result: assignProposals });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
  async findAllProposalsForReviewer(req, res) {
    try {
      const { reviewerId } = req.body;
      // console.log(reviewerId, "reviewerId");
      const assignments = await this.proposalAssignment.find(
        {
          reviewerId: reviewerId,
        },
        { proposalText: 0, financialProposal: 0, testing: 0 }
      );
      const proposalIds = assignments.map((a) => a.proposalId);
      let proposals = await this.proposalModel
        .find({ _id: proposalIds })
        .populate({ path: "projectID", select: "title" })
        .populate({ path: "submittedBy.id", select: "companyName" });
      // Create a new array of proposals with the submission date from the corresponding assignment
      proposals = proposals.map((proposal) => {
        const assignment = assignments.find(
          (a) => a.proposalId.toString() === proposal._id.toString()
        );
        return {
          ...proposal._doc,
          submissionDate: assignment ? assignment.submissionDate : null,
        };
      });
      if (!proposals) {
        console.log("not");
        return res.status(404).json({ message: "Proposal not found" });
      }
      console.log("response");
      res.status(200).json({ message: "success", result: proposals });
    } catch (error) {
      console.log("catch");
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
  async sendToAgency(req, res) {
    try {
      const { proposalID } = req.body;
      if (!proposalID) {
        return res.status(400).json({ message: "Invalid request" });
      }
      const response = await this.proposalModel.findByIdAndUpdate(
        proposalID,
        {
          sendToAgency: true,
        },
        { new: true }
      );
      if (!response) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(201).json({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  }
  async uploadAwardedContract(req, res) {
    const { proposalID } = req.body;
    const session = await this.mongoose.startSession();
    try {
      session.startTransaction();
      const fileSize = this.fs.statSync(req.body.image.url).size / 1024 / 1024; // in MB
      req.body.image.size = fileSize.toFixed(2);
      const updatedProposal = await this.proposalModel.findByIdAndUpdate(
        proposalID,
        {
          awardedDocs: req.body.image,
        },
        { new: true, session: session }
      );
      if (!updatedProposal) {
        return res.status(404).json({ message: "error in updating proposal" });
      }
      const updatedProject = await this.projectsModel.findByIdAndUpdate(
        updatedProposal.projectID,
        {
          $push: { initialProposalsChosenByAgency: updatedProposal?._id },
        },
        { new: true, session: session }
      );
      if (!updatedProject) {
        return res.status(404).json({ message: "error in updating project" });
      }
      await session.commitTransaction();
      return res.status(200).json({ type: "success", result: updatedProject });
    } catch (error) {
      console.log(error);
      session.abortTransaction();
      return res.status(500).json({
        type: "failure",
        result: "Server not Responding. Try Again",
      });
    } finally {
      session.endSession();
    }
  }
  async uploadFinalContract(req, res) {
    const { proposalID } = req.body;
    const session = await this.mongoose.startSession();
    try {
      session.startTransaction();
      const fileSize = this.fs.statSync(req.body.image.url).size / 1024 / 1024; // in MB
      req.body.image.size = fileSize.toFixed(2);
      const updatedProposal = await this.proposalModel.findByIdAndUpdate(
        proposalID,
        {
          contractedDocs: req.body.image,
        },
        { new: true, session: session }
      );
      console.log(updatedProposal, "updatedProposal");
      console.log(updatedProposal?.milestones, "updatedProposal milestones");
      if (!updatedProposal) {
        return res.status(404).json({ message: "error in updating proposal" });
      }
      const requiredMilestones = await this.milestones.findById(
        updatedProposal?.milestones
      );
      if (!requiredMilestones) {
        return res.status(404).json({ message: "error in finding milestones" });
      }
      let startDate = moment();
      const milestonesUpdates = requiredMilestones?.details.map(
        (milestone, index) => {
          const durationMonths = parseInt(milestone?.duration) || 0;
          console.log(durationMonths, "durationMonths");
          const endDate = moment(startDate).add(durationMonths, "months");

          // Prepare update object for the milestone
          const update = {
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
          };

          // Update startDate for the next iteration
          startDate = moment(endDate).add(1, "days");

          return update;
        }
      );
      requiredMilestones.startDate = milestonesUpdates[0].startDate;
      requiredMilestones.endDate = milestonesUpdates[0].endDate;
      await requiredMilestones.save({ session: session });
      const updatedProject = await this.projectsModel.findByIdAndUpdate(
        updatedProposal.projectID,
        {
          $push: {
            finalProposalsChosenByAgency: updatedProposal?._id,
            milestones: updatedProposal?.milestones,
          },
        },
        { new: true, session: session }
      );
      if (!updatedProject) {
        return res.status(404).json({ message: "error in updating project" });
      }
      await session.commitTransaction();
      await LocalFuncioncreateMileStoneChat(
        updatedProject,
        updatedProposal,
        requiredMilestones._id
      );
      return res.status(200).json({ type: "success", result: updatedProject });
    } catch (error) {
      console.log(error);
      session.abortTransaction();
      return res.status(500).json({
        type: "failure",
        result: "Server not Responding. Try Again",
      });
    } finally {
      session.endSession();
    }
  }
  async findAcceptedProposalsForAcademiaIndusrty(req, res) {
    const { id } = req.body;
    try {
      const proposal = await this.proposalModel
        .find({
          "submittedBy.id": id,
          contractedDocs: { $exists: true, $ne: null },
        })
        .populate("milestones", "startDate endDate")
        .populate("projectID", "title");
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res.status(200).json({ message: "success", result: proposal });
    } catch (error) {
      return res.status(500).json({ message: "internal error" });
    }
  }
}
module.exports = ProposalController;

class MilestoneController {
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

  async getMilestone(req, res) {
    const { id } = req.body;
    console.log({ milestoneIdid: id });

    try {
      const reqMilestones = await this.milestones.findById(id);
      if (!reqMilestones) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      return res
        .status(200)
        .json({ message: "success", result: reqMilestones });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateSingleMilestone(req, res) {
    const {
      title,
      cost,
      progress,
      duration,
      milestoneID,
      description,
      milestoneIndex,
    } = req.body;
    try {
      const reqMilestones = await this.milestones.findById(milestoneID);
      if (!reqMilestones) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      if (req?.uploadedFilesArray?.length > 0) {
        reqMilestones.newDetails[milestoneIndex] = {
          title,
          cost,
          progress,
          duration,
          description,
          inReview: true,
          milestoneIndex,
          files: req.uploadedFilesArray,
        };
        await reqMilestones.save();
        return res
          .status(200)
          .json({ message: "success", result: reqMilestones });
      }
      reqMilestones.newDetails[milestoneIndex] = {
        ...reqMilestones.details[milestoneIndex],
        title,
        cost,
        progress,
        duration,
        description,
        inReview: true,
        milestoneIndex,
      };
      await reqMilestones.save();
      return res
        .status(200)
        .json({ message: "success", result: reqMilestones });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async acceptChangesInSingleMilestone(req, res) {
    const { milestoneID, milestoneIndex, newDetailsIndex } = req.body;
    try {
      const reqMilestones = await this.milestones.findById(milestoneID);
      if (!reqMilestones) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      if (reqMilestones?.newDetails?.length > 0) {
        const filteredNewDetails = reqMilestones.newDetails.filter(
          (detail, index) => detail?.milestoneIndex == newDetailsIndex
        );
        reqMilestones.details[milestoneIndex] = filteredNewDetails[0];
        reqMilestones.newDetails = reqMilestones.newDetails.filter(
          (detail, index) => detail?.milestoneIndex != newDetailsIndex
        );
        await reqMilestones.save();
        return res
          .status(200)
          .json({ message: "success", result: reqMilestones });
      }
      return res.status(400).json({ message: "No changes to accept" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async rejectChangesInSingleMilestone(req, res) {
    const { milestoneID, newDetailsIndex, rejectionReason } = req.body;
    try {
      const reqMilestones = await this.milestones.findById(milestoneID);
      if (!reqMilestones) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      if (reqMilestones?.newDetails?.length > 0) {
        console.log(reqMilestones?.newDetails, "reqMilestones?.newDetails");
        let changesMade = false;
        reqMilestones.newDetails.forEach((detail, index) => {
          if (detail?.milestoneIndex == newDetailsIndex) {
            detail.inReview = false;
            detail.rejectionReason = rejectionReason;
            changesMade = true;
          }
        });
        if (changesMade) {
          reqMilestones.markModified("newDetails");
          await reqMilestones.save();
          return res
            .status(200)
            .json({ message: "success", result: reqMilestones });
        }
      }
      return res.status(400).json({ message: "No changes to accept" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getSingleMilestone(req, res) {
    const { milestoneID, milestoneIndex } = req.body;
    try {
      const reqMilestones = await this.milestones.findById(milestoneID);
      if (!reqMilestones) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      let reqSingleMilestone = reqMilestones.details[milestoneIndex];
      return res
        .status(200)
        .json({ message: "success", result: reqSingleMilestone });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getFilesofSingleMilestone(req, res) {
    const { milestoneID } = req.body;
    try {
      const milestone = await this.milestones.findById(milestoneID);

      if (!milestone) {
        return res.status(404).send("Milestone not found");
      }
      const files = milestone.details.map((detail) => detail?.files).flat();
      res.status(200).json({ message: "success", result: files });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = MilestoneController;

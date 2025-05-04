const { deleteFile } = require("../helper/deleteFile");
const { getBodyParserForFormData } = require("../helper/getBodyParserForFormData");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { industry, user } = require("../modals");

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchQuery = req.query.search;
    const searchCategory = req.query.category;

    let query = {};
    if (searchQuery) {
      query["user.account.name"] = {
        $regex: new RegExp("^" + searchQuery, "i"),
      };
    }

    if (searchCategory) {
      query["category"] = {
        $regex: new RegExp("^" + searchCategory, "i"),
      };
    }

    const userIndustry = await industry.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          _id: 1,
          Role: 1,
          role: 1,
          type: 1,
          category: 1,
          user: 1,
          name: 1,
          image: 1,
        },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual collection name if different
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] }, // Ensure user is an object, not an array
        },
      },
      {
        $group: {
          _id: null,
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: { path: "$docs", includeArrayIndex: "index" },
      },
      {
        $addFields: {
          "docs.id": { $add: ["$index", 1] }, // Incremental id starting from 1
        },
      },
      {
        $replaceRoot: { newRoot: "$docs" },
      },
      {
        $project: {
          _id: 1,
          Role: 1,
          type: 1,
          name: 1,
          role: 1,
          category: 1,
          image: 1,
          "user.account.name": 1,
          "user.account.email": 1,
          "user.account.phone": 1,
          id: "$id", // Ensure id field is included
        },
      },
    ]);

    if (!userIndustry || userIndustry.length === 0) {
      return res.status(404).json({ type: "failure", result: "No Users Found" });
    }

    return res.status(200).json({ type: "success", result: userIndustry });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ type: "failure", result: "Server Error" });
  }
};

exports.getmyprofile = async (req, res) => {
  try {
    if (!req.authId) {
      return res.status(403).json({
        type: "failure",
        result: "token is required",
      });
    }
    var a = await industry.findOne({
      user: req.authId,
    });
    res.status(200).json({
      type: "success",
      userDetails: {
        ...a._doc,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.createOrupdateprofile = async (req, res) => {
  getBodyParserForFormData(req);
  const roleAndId = getUserRoleAndId(req);
  try {
    var user_industry = await industry.findOne({ user: roleAndId.rootUserId });
    if (!user_industry) {
      console.log("user not found, creating new one", req.authId);
      user_industry = await industry.create({
        ...req.body,
        profileComplete: true,
        user: req.authId,
        role: "industry",
      });
      await user.findByIdAndUpdate(
        req.authId,
        {
          industry: user_industry._id,
        },
        { new: true }
      );
    } else {
      if (req.body.image) {
        deleteFile(user_industry.image);
      }
      user_industry = await industry.findOneAndUpdate(
        { user: roleAndId.rootUserId },
        {
          $set: {
            ...req.body,
            profileComplete: true,
            role: "industry",
          },
        },
        { new: true }
      );

      await user.findByIdAndUpdate(
        req.authId,
        {
          industry: user_industry._id,
        },
        { new: true }
      );
    }

    return res.status(200).json({ type: "success", result: user_industry });
  } catch (error) {
    deleteFile(req.body.image);

    console.log(error.message);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

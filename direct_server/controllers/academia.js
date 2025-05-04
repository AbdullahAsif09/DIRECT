const { deleteFile } = require("../helper/deleteFile");
const {
  getBodyParserForFormData,
} = require("../helper/getBodyParserForFormData");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { academia, user } = require("../modals");

exports.getmyprofile = async (req, res) => {
  try {
    var user = await academia.findOne({
      $or: [{ _id: req.body._id }],
    });
    res.status(200).json({
      type: "success",
      userDetails: {
        ...user._doc,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.createOrupdateprofile = async (req, res) => {
  try {
    getBodyParserForFormData(req);

    const roleAndId = getUserRoleAndId(req);
    var user_academia = await academia.findOne({ user: roleAndId.rootUserId });

    if (!user_academia) {
      user_academia = await academia.create({
        ...req.body,
        user: roleAndId.rootUserId,
        profileComplete: true,
        role: "academia",
      });
      await user.findByIdAndUpdate(roleAndId.rootUserId, {
        academia: user_academia._id,
      });
    } else {
      if (req.body.image) {
        deleteFile(user_academia.image);
      }
      user_academia = await academia.findOneAndUpdate(
        { user: roleAndId.rootUserId },
        {
          $set: {
            ...req.body,
            role: "academia",
            profileComplete: true,
          },
        },
        { new: true }
      );

      await user.findByIdAndUpdate(roleAndId.rootUserId, {
        academia: user_academia._id,
      });
    }

    return res.status(200).json({ type: "success", result: user_academia });
  } catch (error) {
    console.log(error.message);

    deleteFile(req.body.image);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
// exports.getAllUsers = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;
//     const searchQuery = req.query.search;
//     const searchCategory = req.query.category;

//     let query = {};
//     if (searchQuery) {
//       query["user.account.name"] = {
//         $regex: new RegExp("^" + searchQuery, "i"),
//       };
//     }

//     if (searchCategory) {
//       query["category"] = {
//         $regex: new RegExp("^" + searchCategory, "i"),
//       };
//     }

//     const userAcademia = await academia.aggregate([
//       {
//         $match: query,
//       },
//       {
//         $project: {
//           _id: 1,
//           Role: 1,
//           role: 1,
//           createdAt: 1,
//           category: 1,
//           name: 1,
//           image: 1,
//           currentUniversity: 1,
//         },
//       },
//       {
//         $lookup: {
//           from: "users", // Replace with the actual collection name if different
//           localField: "user",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $addFields: {
//           user: { $arrayElemAt: ["$user", 0] }, // Ensure user is an object, not an array
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           docs: { $push: "$$ROOT" },
//         },
//       },
//       {
//         $unwind: { path: "$docs", includeArrayIndex: "index" },
//       },
//       {
//         $addFields: {
//           "docs.id": { $add: ["$index", 1] }, // Incremental id starting from 1
//         },
//       },
//       {
//         $replaceRoot: { newRoot: "$docs" },
//       },
//       {
//         $project: {
//           _id: 1,
//           Role: 1,
//           type: 1,
//           role: 1,
//           name: 1,
//           category: 1,
//           image: 1,
//           "user.account.name": 1,
//           "user.account.email": 1,
//           "user.account.phone": 1,
//           currentUniversity: 1,
//           id: 1, // Ensure id field is included
//         },
//       },
//     ]);

//     if (!userAcademia || userAcademia.length === 0) {
//       return res.status(404).json({ type: "failure", result: "No User Found" });
//     }

//     return res.status(200).json({ type: "success", result: userAcademia });
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(500)
//       .json({ type: "failure", result: "Server Not Responding" });
//   }
// };

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

    const userIndustry = await academia.aggregate([
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
      return res
        .status(404)
        .json({ type: "failure", result: "No Users Found" });
    }

    return res.status(200).json({ type: "success", result: userIndustry });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ type: "failure", result: "Server Error" });
  }
};

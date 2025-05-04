const {
  checkPasswordValidity,
} = require("../../helper/checkPasswordComlexity");
const { throwError } = require("../../helper/throwError");
const Admin = require("../../modals/admin/admin");

exports.createSubAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const doesAdminExist = await Admin.findOne({ email });

    if (!firstName || !lastName || !email || !phone || !password) {
      throwError("All fields are required", 400);
    }

    if (doesAdminExist) {
      throwError("Admin with this email already exists", 400);
    }

    const passwordValidity = checkPasswordValidity(password);

    if (!passwordValidity.isValid) {
      throwError(
        `Password should contain at least 8 characters, including uppercase, lowercase, and numbers. Your password failed: ${passwordValidity.failedRequirements.join(
          ", "
        )}`,
        400
      );
    }
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "projectManager",
      verify: true,
    });
    await newAdmin.save();
    res.status(201).json({ type: "success", result: newAdmin });
  } catch (error) {
    res.status(500).json({
      type: "failure",
      result: error.message ?? "Server not Responding. Try Again",
    });
  }
};
exports.getSubAdmins = async (req, res) => {
  try {
    const query = req.query;

    const admins = await Admin.aggregate([
      {
        $match: {
          verify: true,
          role: { $in: [query.type ?? ""] }, // Check if the role array contains "something"
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
        },
      },
      {
        $sort: { _id: 1 }, // Ensure a consistent order if necessary
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
          "docs.id": { $add: ["$index", 1] },
        },
      },
      {
        $replaceRoot: { newRoot: "$docs" },
      },
    ]);

    if (!admins) {
      res.status(404).json({
        type: "failure",
        result: "No Admin Found",
      });
    }
    res.status(200).json({
      type: "success",
      result: admins,
    });
  } catch (error) {
    console.log(error);
  }
};

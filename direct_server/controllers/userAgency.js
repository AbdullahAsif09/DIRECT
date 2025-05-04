const { SendEmail } = require("../common/email");
const { setCookies } = require("../helper/cookie");
const { getToken } = require("../helper/jwtToken");
const { uploadDiskStorage } = require("../middlewares/multer");
class UserAgencyController {
  constructor(
    proposal,
    projects,
    feedback,
    userAgency,
    path,
    JWT,
    JWT_SECRET_KEY
  ) {
    this.proposalModel = proposal;
    this.projectsModel = projects;
    this.feedbackModel = feedback;
    this.userAgency = userAgency;
    this.path = path;
    this.JWT = JWT;
    this.JWT_KEY = JWT_SECRET_KEY;
  }

  async verify(req, res) {
    try {
      const Id = req.query.token;

      var user = await this.userAgency.findOne({ _id: Id });

      user.verify = true;
      user
        .save()
        .then(() => {
          res.sendFile(
            this.path.join(__dirname + "../../templates/emailverified.html")
          );
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ type: "failure", result: "Server Not Responding" });
          return;
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "failure",
        result: "Server not Responding. Try Again",
      });
    }
  }
  async createUserAgency(req, res) {
    try {
      const oldUser = await this.userAgency.findOne({
        $or: [
          { email: req.body?.email.toLowerCase() },
          { phone: req.body?.phone },
        ],
      });
      if (oldUser) {
        return res.status(400).json({
          type: "emailExist",
          result:
            "User already Exist. Choose a Different email and phone number",
        });
      }
      const user = await this.userAgency.create({
        ...req.body,
        role: "userAgency",
      });
      user.password = await this.userAgency.CreateHash(user.password);
      user.email = req.body.email.toLowerCase();

      SendEmail(user.email, user.firstname, user, res, "userAgency");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ type: "failure", result: "Server not Responding. Try Again" });
    }
  }
  async getUserAgency(req, res) {
    try {
      var user = await this.userAgency.findOne(
        {
          $or: [
            { email: req.body.email.toLowerCase() },
            { phone: req.body.email },
          ],
        },
        { verify: 0 }
      );
      if (!user) {
        res.status(401).json({
          type: "failure",
          result: "No User Exists With Such Email or Phone",
        });
      } else {
        if (user.verify === false) {
          return res
            .status(401)
            .json({ type: "failureEmail", result: "Email is not verified" });
        }
        const isEqual = await this.userAgency.isPasswordEqual(
          req.body.password,
          user.password
        );

        if (isEqual) {
          const token = getToken(user, "userAgency", req);

          setCookies(res, token);

          res.status(200).json({
            type: "success",
            result: "User Login Successfully",
            userDetails: {
              ...user._doc,
            },
          });
        } else {
          res.status(401).json({ type: "failure", result: "Wrong Password" });
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ type: "failure", result: "Server Not Responding" });
    }
  }
  async getAllUsers(req, res) {
    try {
      const searchQuery = req.query.search || "";
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page
      const skip = (page - 1) * limit;

      const result = await this.userAgency.aggregate([
        {
          $match: {
            name: {
              $regex: new RegExp("^" + searchQuery, "i"), // 'for search query
            },
            verify: true,
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            name: 1,
            phone: 1,
            type: 1,
            role: 1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
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
            "docs.id": { $add: ["$index", skip + 1] }, // Incremental id starting from 1, adjusted for pagination
          },
        },
        {
          $replaceRoot: { newRoot: "$docs" },
        },
      ]);

      if (!result || result.length < 1) {
        return res.status(401).json({
          type: "failure",
          result: [],
        });
      }

      res.status(200).json({
        type: "success",
        result: result,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ type: "failure", result: "Server Not Responding" });
    }
  }

  async uploadusr(req, res) {
    console.log("inside request");
    try {
      uploadDiskStorage(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res
            .status(400)
            .json({ message: "Multer error occurred", error: err });
        } else if (err) {
          return res
            .status(500)
            .json({ message: "Unknown error occurred", error: err });
        }
        const files = req.uploadedFiles;

        await this.userAgency.create({ user: req.authId, files: files });
        const usrs = await this.userAgency.aggregate([
          { $match: { user: mongoose.Types.ObjectId(req.authId) } }, // Ensure req.authId is an ObjectId
          { $unwind: "$files" },
          {
            $project: {
              _id: 1,
              file: "$files",
              createdAt: 1,
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  "$file",
                  { createdAt: "$createdAt", _id: "$_id" },
                ],
              },
            },
          },
          { $sort: { createdAt: -1 } },
        ]);
        res.status(200).json({
          type: "success",
          result: "Document Uploaded Successfully",
          data: usrs,
        });
      });
    } catch (e) {
      return res.json({ type: "failure", result: "Server Not Responding" });
    }
  }
  async getProjects(req, res) {
    // const id = req.authId;
    const { id } = req.body;
    try {
      const projectInfo = await this.projectsModel.find(
        { userAgency: { $in: [id] } },
        {
          title: 1,
          createdAt: 1,
          published: 1,
          proposalsAmount: 1,
          image: 1,
        }
      );
      if (!projectInfo) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", data: projectInfo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Project not found || internal error" });
    }
  }
  async getProject(req, res) {
    // const id = req.query.id;
    const { id } = req.body;
    try {
      const projectInfo = await this.projectsModel.findById(id, {
        title: 1,
        createdAt: 1,
        published: 1,
        proposalsAmount: 1,
        image: 1,
        description: 1,
      });
      if (!projectInfo) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", data: projectInfo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Project not found || internal error" });
    }
  }
}
module.exports = UserAgencyController;

const ChatRoom = require("../modals/chatroom/chat");
const Message = require("../modals/chatroom/message");
const Members = require("../modals/chatroom/members");
const Projects = require("../modals/projects");
const Proposals = require("../modals/proposal");
const Banned = require("../modals/banned");

const eventEmitter = require("../emitter");
const adminModel = require("../modals/admin/admin");
const DepartMentMembers = require("../modals/departmentMembers");
const OrganizationAdmin = require("../modals/organizationAdmin");
const { decryption } = require("../helper/AES");
const { throwError } = require("../helper/throwError");
const { LocalFunctionGetCategories } = require("./categories");
const { models } = require("../constants/collections");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { rolesToCollectionMapper } = require("../constants");

/********************************  MILESTONE CHAT  ********************************  /

/* get chat messages */

exports.getMileStoneMessages = async (req, res, next) => {
  const milestone = req.params.id;
  if (!milestone || milestone == null || milestone == undefined)
    return res.status(401).json({ error: "no milestone id found" });
  const { page = 1 } = req.query;

  const resultPerPage = 100;
  const skip = (page - 1) * resultPerPage;

  const chat = await ChatRoom.findOne({ milestone }).lean();

  if (!chat) return res.status(404).json({ errr: "Chat not Found" });
  const members = await Members.find({ chatId: chat._id, status: "joined" })
    .populate({
      path: "id", // Path to the reference field
      select: "firstName lastName name _id image account.name role",
    })
    .lean();

  const findUser = members?.find((e) => e.id?._id == req.authId);
  if (!findUser) return res.status(403).json({ errr: "You are not allowed to access this chat" });

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chat._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultPerPage)
      .populate({
        path: "sender.id",
        select: "firstName lastName name _id",
      })
      .lean(),
    Message.countDocuments({ chat: chat._id }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;
  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
};

/* get chat info */

exports.getMileStoneChatInfo = async (req, res, next) => {
  const milestone = req.params.id;
  if (!milestone || milestone == null)
    return res.status(401).json({ error: "no milestone id found" });

  const data = await ChatRoom.findOne({
    milestone: req.params.id,
    isPrivate: true,
  }).lean();

  if (!data || !data._id) {
    return res.status(404).json({ error: "Chat not found" });
  }

  const members = await Members.find({ chatId: data._id, status: "joined" })
    .populate({
      path: "id", // Path to the reference field
      select: "firstName lastName name _id image account.name role",
    })
    .lean();

  console.log(req.authId);

  const findUser = members?.find((e) => e?.id?._id == req?.authId);
  if (!findUser) return res.status(403).json({ errr: "You are not allowed to access this chat" });

  return res.status(200).json({ ...data, members });
};

/********************************   PUBLIC CHAT  ********************************  /

/* get chat messages */
exports.getPublicChatMessages = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    if (!chatId || chatId == null || chatId == undefined)
      return res.status(401).json({ error: "no chatId found" });

    const data = await this.locaFunctionGetPublicChatMessages(chatId, req.query, req.authId);

    if (data.error) {
      return res.status(data.code).json(data.error);
    }

    return res.status(200).json(data.data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

/* get public groups chat list */

exports.getPublicChatsList = async (req, res, next) => {
  const data = await this.localFunctiongetPublicChatList(req, "POST");
  return res
    .status(data.status)
    .json(data?.result ? { result: data?.result } : { error: data?.error });
};

/* get group members */
exports.getGroupMembers = async (req, res, next) => {
  const id = req.params.chatId;

  const [members] = await Promise.all([this.LocalFunctionGetGroupMembers(id, "joined")]);
  return res.status(200).json({ members });
};
exports.getrequests = async (req, res, next) => {
  const id = req.params.chatId;

  const [members] = await Promise.all([this.LocalFunctionGetGroupMembers(id, "request")]);
  return res.status(200).json({ members });
};

/* handle member actions by admin (delete, ban) -deprecated using sockets */
exports.handlemember = async (req, res, next) => {
  try {
    const data = req.body.data;
    const decrypteddata = JSON.parse(decryption(data, req.authId));

    /* removing user from group - no sockets yet */
    if (decrypteddata.type === "remove") {
      const find = await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      if (find) {
        const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "joined");
        return res.status(200).json({ result: members, type: "success" });
      } else {
        return res.status(404).json({ result: "User not found", type: "failure" });
      }
    } else if (decrypteddata.type === "ban") {
      const findMemberToBan = await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      if (!findMemberToBan) {
        return res.status(404).json({ result: "User is not a member", type: "failure" });
      }

      const find = await Banned.findOne({
        "user.id": decrypteddata.userId,
      });

      if (find) {
        return res.status(200).json({ result: "User is already banned", type: "failure" });
      }

      const roleAndId = getUserRoleAndId(req);

      const toSave = {
        type: "chat",
        user: { id: decrypteddata.userId, model: findMemberToBan.model },
        bannedBy: {
          id: roleAndId.userId,
          model: roleAndId.model,
        },
      };

      const [banned, members] = await Promise.all([
        Banned.create(toSave),
        this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "joined"),
      ]);

      return res.status(200).json({ result: members, type: "success" });
    }

    return res.status(400).json({ result: "Invalid action type", type: "failure" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/* handle request action by admin  -deprecated using sockets*/
exports.handlerequestaction = async (req, res, next) => {
  try {
    const data = req.body.data;
    const decrypteddata = JSON.parse(decryption(data, req.authId));

    const member = await Members.findOne({
      id: decrypteddata.userId,
      chatId: decrypteddata.chatId,
    });

    if (!member) {
      throwError("User not found in the group", 404);
    }

    /* removing user from group - no sockets yet */
    if (decrypteddata.type === "accept") {
      const update = await Members.findOneAndUpdate(
        {
          id: decrypteddata.userId,
          chatId: decrypteddata.chatId,
        },
        { $set: { status: "joined" } }
      );

      if (update) {
        const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "request");
        return res.status(200).json({ result: members, type: "success" });
      } else {
        throwError("User not found in the group", 404);
      }
    } else if (decrypteddata.type === "reject") {
      await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "request");

      return res.status(200).json({ result: members, type: "success" });
    }

    throwError("Invalid action type", 400);
  } catch (error) {
    console.error(error.message);
    return res.status(error?.code ?? 500).json({ error: error.message ?? "Internal server error" });
  }
};

/* update group setting type by admin */
exports.updatesetting = async (req, res, next) => {
  try {
    const data = JSON.parse(decryption(req.body.data));
    const chatId = data.chatId;
    const type = data.type;
    console.log(data);

    if (type != "restricted" && type != "unrestricted") {
      throwError("Invalid type", 400);
    }

    const chat = await ChatRoom.findByIdAndUpdate(
      chatId,
      {
        $set: {
          type,
        },
      },
      { new: true }
    );

    return res.json({ type: "success", chat });
    /* removing user from group - no sockets yet */
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/********************************   LOCAL FUNCTIONS ********************************  /

/* test craete public chat groups */

const localFunctinoCreategroupstest = async () => {
  const projecs = await Projects.find({ published: true });
  const mapped = projecs.map(async (project) => {
    await this.locaFunctioncreatePublicGroupChat(project);
  });
  await Promise.all(mapped);
};
const localFunctinoCreateMileStoneGrouptest = async () => {
  const project = await Projects.findOne({
    _id: "668e4a4845ebce46fe44cac7",
  });
  const proposal = await Proposals.findOne({
    _id: "668f77986935b38101cb6f1e",
  });

  const milestone = "668f77976935b38101cb6f19";
  await this.LocalFuncioncreateMileStoneChat(project, proposal, milestone);
};
const localFunctionCreateCategoriesChat = async () => {
  try {
    const categories = await LocalFunctionGetCategories();
    const mapped = categories.map(async (category) => {
      await locaFunctioncreateCategoryGroupChat(category);
    });
    await Promise.all(mapped);
  } catch (error) {
    console.error(error.message);
  }
};

// localFunctionCreateCategoriesChat();
// localFunctinoCreategroupstest();
// localFunctinoCreateMileStoneGrouptest();

/* create seperate category chat */
const locaFunctioncreateCategoryGroupChat = async (category) => {
  const admins = await adminModel.find({ type: "super" });

  const dataForDb = {
    name: category.name,
    groupChat: true,
    isPrivate: false,
    type: "unrestricted",
    category: "general",
  };

  const data = await ChatRoom.create(dataForDb);

  const adminMembers = admins.map(async (e) => {
    await Members.create({
      id: e._id,
      model: "admin",

      chatId: data._id,
      status: "joined",
    });
  });

  await Promise.all(adminMembers);
  return data;

  // eventEmitter.emit("newPublicGroupChat", data?._id);
};

/* get public chat list */

exports.localFunctiongetPublicChatList = async (req, method) => {
  try {
    if (method) {
      var data = await decryption(req.body.e, req.authId);
    }
    // Step 0: Get user id from request

    const roleAndId = getUserRoleAndId(req);
    const model = data?.role ?? roleAndId.model;
    const userId = data?.userId ?? roleAndId.userId;

    const user = await models[model].findById(userId);

    const userCategories = user?.categories ?? [];

    // Step 1: Find all chat rooms
    const query = {
      $or: [
        { category: "project" },
        {
          $and: [
            { category: "general" },
            {
              $or: [
                // For admins, this condition will be true for all chats
                model === "admin" ? {} : { name: { $in: userCategories } },
              ],
            },
          ],
        },
      ],
    };

    const chatRooms = await ChatRoom.find(query).lean();

    // Step 2: Map chat rooms to include members
    const chatRoomsWithMembers = await Promise.all(
      chatRooms.map(async (chat) => {
        let members = [];
        // if (req.role !== "admin") {
        //   members = await Members.find({ chatId: chat._id })
        //     .populate({
        //       path: "id", // Path to the reference field
        //       select: "firstName lastName name _id image account.name role",
        //     })
        //     .lean();
        // }

        return { ...chat, members };
      })
    );

    // Step 3: Separate chat rooms into groups and direct messages
    const projects = [];
    const general = [];

    chatRoomsWithMembers.forEach((chatRoom) => {
      if (chatRoom?.category === "project") {
        projects.push(chatRoom);
      } else if (chatRoom?.category === "general") {
        general.push(chatRoom);
      }
    });

    // Step 4: Format the output
    const result = [
      {
        type: "projects",
        title: "Projects",
        list: projects,
      },
    ];
    if (general.length > 0) {
      result.push({
        type: "General",
        title: "General Groups",
        list: general,
      });
    }

    // Step 5: Return the result
    return { result, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: error.message, status: 500 };
  }
};

/* get public chat messages */
exports.locaFunctionGetPublicChatMessages = async (chatId, query, authId) => {
  try {
    if (!chatId || chatId == null || chatId == undefined)
      return { error: "no chatId found", code: 401 };

    const { page = 1 } = query;
    const resultPerPage = 100;
    const skip = (page - 1) * resultPerPage;

    const [chat, members] = await Promise.all([
      ChatRoom.findById(chatId),
      Members.find({ chatId }),
    ]);

    if (!chat) {
      return { error: "Chat not found", code: 404 };
    }
    const findUser = members.find((e) => e.id == authId);

    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chat._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate({
          path: "sender.id",
          select: "firstName lastName name _id image account.name role",
        })
        .lean(),
      Message.countDocuments({ chat: chat._id }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

    if (!findUser) {
      return {
        data: {
          success: true,
          messages: [],
          totalPages: 0,
          joined: false,
        },
      };
    } else if (findUser?.status === "request") {
      return {
        data: {
          success: true,
          messages: [],
          totalPages: 0,
          joined: false,
          requested: true,
        },
        code: 200,
      };
    } else
      return {
        data: {
          success: true,
          messages: messages,
          totalPages,
          joined: Boolean(findUser),
        },
        code: 200,
      };
  } catch (e) {
    return { error: e.message, code: 500 };
  }
};

/* crete public chat */
exports.locaFunctioncreatePublicGroupChat = async (project) => {
  const projectId = project._id;
  const admins = await adminModel.find({
    role: { $elemMatch: { $in: ["super"] } },
  });

  const dataForDb = {
    project: projectId,
    name: project.title,
    groupChat: true,
    isPrivate: false,
    type: "unrestricted",
    category: "project",
  };

  const data = await ChatRoom.create(dataForDb);

  const adminMembers = admins.map(async (e) => {
    await Members.create({
      id: e._id,
      model: "admin",

      chatId: data._id,
      status: "joined",
    });
  });

  await Promise.all(adminMembers);

  console.log("emitting new public group chat", data?._id);
  eventEmitter.emit("newPublicGroupChat", data?._id);
};

exports.LocalFunctionPublicGroupJoinChat = async (user, data) => {
  try {
    const chatId = data.chatId;

    if (!chatId) {
      return { error: "No chatId ID found", code: 401 };
    }

    const [chatRoom, foundUser, bannedUser] = await Promise.all([
      ChatRoom.findOne({ _id: chatId }).lean(),
      Members.findOne({ chatId, id: user.authId }).lean(),
      Banned.findOne({ "user.id": user.authId }).lean(),
    ]);

    if (bannedUser) {
      return { error: "You are banned from public groups!", code: 403 };
    }

    if (!chatRoom) {
      return { error: "Project not found", code: 404 };
    }

    const isUserMember = foundUser;

    let updatedChatRoom;

    if (!isUserMember) {
      await Members.create({
        chatId: chatRoom._id,
        id: user.authId,
        model: user.role ?? user.model,
        status: chatRoom?.type === "restricted" ? "request" : "joined",
      });

      const findMembers = await Members.find({
        chatId: chatRoom._id,
        status: "joined",
      })
        .populate({
          path: "id",
          select: "firstName lastName name _id image account.name role",
        })
        .lean();

      updatedChatRoom = { ...chatRoom, members: findMembers };
    } else {
      updatedChatRoom = chatRoom; // If user is already a member, return the existing chat room
    }

    return updatedChatRoom;
  } catch (error) {
    return { error: error.message, code: 500 };
  }
};

/* create mile stone group chat */
exports.LocalFuncioncreateMileStoneChat = async (project, proposal, milesstoneId) => {
  const projectId = project._id;
  const projectToFind = await Projects.findById(projectId);

  // Prepare data for the chat room
  const dataForDb = {
    project: projectId,
    milestone: milesstoneId,
    name: project.title,
    groupChat: true,
    isPrivate: true,
    type: "restricted",
    category: "milestone",
    department: projectToFind.department,
    organization: projectToFind.organization,
  };

  // Create the chat room
  const chat = await ChatRoom.create(dataForDb);

  // Fetch necessary department and admin details concurrently
  let departmentMembers = [];
  if (projectToFind.department) {
    // Fetch all matching department and organization members
    const [departmentResults, organizationResults] = await Promise.all([
      DepartMentMembers.find({ department: projectToFind.department }),
      OrganizationAdmin.find({ organization: projectToFind.organization }),
    ]);

    // Combine the results from both queries
    departmentMembers = [...departmentResults, ...organizationResults];
  }
  console.log(departmentMembers);

  // Map the fetched members to the desired structure
  const mappedOrgAndDepartmentMembers = departmentMembers
    .map((member) => {
      if (member) {
        return {
          id: member._id,
          model: rolesToCollectionMapper[member.role[0]], // Assuming role[0] exists and maps correctly
        };
      }
      return null; // Optional, can be omitted
    })
    .filter((e) => e); // Filter out any null or undefined values

  // Fetch super admins once, as it's used in multiple places
  const admins = await adminModel.find({
    role: { $elemMatch: { $in: ["super"] } },
  });

  // Map super admins to chat members
  const adminMembers = admins.map((admin) => ({
    id: admin._id,
    model: "admin",
  }));

  // Determine the user based on project conditions
  let user = [];
  if (!project?.fundingAgency?.[0] && !project?.userAgency?.[0]) {
    if (project?.usrBy?.[0]) {
      user.push({
        id: project.usrBy[0],
        model: "users",
      });
    }
  } else {
    user = [
      { id: project.fundingAgency[0], model: "FundingAgency" },
      { id: project.userAgency[0], model: "userAgency" },
    ];
  }

  // Combine all members
  const members = [
    ...adminMembers,
    ...user,
    ...mappedOrgAndDepartmentMembers,
    {
      id: proposal.submittedBy.id,
      model: proposal.submittedBy.model,
    },
  ].map((member) => ({
    ...member,
    chatId: chat._id,
    status: "joined",
  }));

  // Batch insert all members to reduce multiple database operations
  if (members.length) {
    await Members.insertMany(members);
  }
};

/* get public group members */
exports.LocalFunctionGetGroupMembers = async (id, status) => {
  const members = Members.find({ chatId: id, status })
    .populate({
      path: "id", // Path to the reference field
      select: "firstName lastName name _id image account.name role",
    })
    .lean();

  return members;
};
/* get public group info */
exports.LocalFunctionGetGroupInfo = async (id) => {
  const chat = await ChatRoom.findById(id).lean();
  return chat;
};

/* admin action for user reques approval/reject */
exports.LocalFunctionHandleUserRequestByAdmin = async (data, authId) => {
  try {
    const decrypteddata = JSON.parse(decryption(data, authId));

    const member = await Members.findOne({
      id: decrypteddata.userId,
      chatId: decrypteddata.chatId,
    });

    if (!member) {
      return { error: "User not found in the group", code: 404 };
    }

    /* removing user from group - no sockets yet */
    if (decrypteddata.type === "accept") {
      const update = await Members.findOneAndUpdate(
        {
          id: decrypteddata.userId,
          chatId: decrypteddata.chatId,
        },
        { $set: { status: "joined" } }
      );

      if (update) {
        const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "request");
        return { result: members, type: "success", decrypted: decrypteddata };
      } else {
        return { error: "User not found in the group", code: 404 };
      }
    } else if (decrypteddata.type === "reject") {
      await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "request");

      return { result: members, type: "success", decrypted: decrypteddata };
    }

    return { error: "Invalid action type", code: 400 };
  } catch (error) {
    return { error: error.message, code: 500 };
  }
};

/* admin action for user reques ban-remvoe */
exports.LocalFunctionHandleUserStatusByAdmin = async (data, authId) => {
  try {
    const decrypteddata = JSON.parse(decryption(data, authId));

    /* removing user from group - no sockets yet */
    if (decrypteddata.type === "remove") {
      const find = await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      if (find) {
        const members = await this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "joined");
        return { result: members, type: "success", decrypted: decrypteddata };
      } else {
        return { error: "User not found in the group", code: 404 };
      }
    } else if (decrypteddata.type === "ban") {
      const findMemberToBan = await Members.findOneAndDelete({
        id: decrypteddata.userId,
        chatId: decrypteddata.chatId,
      });

      if (!findMemberToBan) {
        return { error: "User not found in the group", code: 404 };
      }

      const find = await Banned.findOne({
        "user.id": decrypteddata.userId,
      });

      if (find) {
        return { error: "User is already banned", type: "failure" };
      }

      const toSave = {
        type: "chat",
        user: { id: decrypteddata.userId, model: findMemberToBan.model },
        bannedBy: {
          id: req.authId,
          model: "admin",
        },
      };

      const [banned, members] = await Promise.all([
        Banned.create(toSave),
        this.LocalFunctionGetGroupMembers(decrypteddata.chatId, "joined"),
      ]);
      return { result: members, type: "success", decrypted: decrypteddata };
    }

    return { error: "Invalid action type", code: 400 };
  } catch (error) {
    console.error(error.message);
    return { error: "Internal server error", code: 400 };
  }
};

const express = require("express");
const router = express.Router();

const { checkIfAuthenticated } = require("../middlewares/authenticator");
const chatController = require("../controllers/chat");

// Get messages from a chat room

/* milestone chat */

router.get(
  "/messages/:id",
  checkIfAuthenticated,
  chatController.getMileStoneMessages
);

router.get(
  "/chatInfo/:id",
  checkIfAuthenticated,
  chatController.getMileStoneChatInfo
);

/* public projects chat */

router.get(
  "/project/messages/:id",
  checkIfAuthenticated,
  chatController.getPublicChatMessages
);

router.post(
  "/projects",
  checkIfAuthenticated,
  chatController.getPublicChatsList
);

/* get public group members */

router.get(
  "/group/members/:chatId",
  checkIfAuthenticated,
  chatController.getGroupMembers
);
router.get(
  "/group/getrequests/:chatId",
  checkIfAuthenticated,
  chatController.getrequests
);

router.post(
  "/group/handlemember",
  checkIfAuthenticated,
  chatController.handlemember
);

router.post(
  "/group/handlerequestaction",
  checkIfAuthenticated,
  chatController.handlerequestaction
);

router.post(
  "/group/updatesetting",
  checkIfAuthenticated,
  chatController.updatesetting
);

module.exports = router;

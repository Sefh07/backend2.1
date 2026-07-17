const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages
} = require("../controllers/chatController");

router.post("/", sendMessage);
router.get("/:userId", getMessages);
router.delete("/:id", getMessages);

module.exports = router;
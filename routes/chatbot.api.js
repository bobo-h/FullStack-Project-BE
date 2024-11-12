const express = require("express");
const router = express.Router();
const chabotController = require("../controllers/chatbot.controller");

router.post("/", chabotController.createChatbot);


module.exports=router;
const express = require("express");
const router = express.Router();
const chatbotApi = require("./chatbot.api");

router.use("/chatbot",chatbotApi);

module.exports=router;
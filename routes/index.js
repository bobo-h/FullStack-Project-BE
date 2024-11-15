const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const diaryApi = require("./diary.api");
const chatbotApi = require("./chatbot.api");
const productApi = require("./product.api")

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/diary", diaryApi);
router.use("/chatbot",chatbotApi);
router.use("/product", productApi)

module.exports = router;
const User = require("../models/User");
const bcrpyt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrpyt.compare(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      } else {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
    }
    throw new Error("입력하신 유저가 존재하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
authController.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      // 유저 생성 위한 패스워드 랜덤 생성
      const randomPassword = "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrpyt.genSalt(10);
      const newPassword = await bcrpyt.hash(randomPassword, salt);
      user = new User({
        email: email,
        name: name,
        password: newPassword,
      });
      await user.save();
    }

    const sessionToken = await user.generateToken();
    return res
      .status(200)
      .json({ status: "success", user, token: sessionToken });

    //토큰발행 리턴
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = authController;
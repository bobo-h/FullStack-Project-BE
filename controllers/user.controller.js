const User = require("../models/User");
const bcrpyt = require("bcryptjs");
const userController = {};

// 회원가입
userController.createUser = async (req, res) => {
  try {
    let { email, password, name, birthday, level, profileImage } = req.body;
    // 이메일 중복검사
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 존재하는 유저입니다.");
    }
    // 비밀번호 암호화
    const salt = await bcrpyt.genSaltSync(10);
    password = await bcrpyt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      birthday,
      level: level ? level : "customer",
      profileImage: profileImage ? profileImage : "",
    });
    await newUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "FAIL", message: error.message });
  }
};
module.exports = userController;

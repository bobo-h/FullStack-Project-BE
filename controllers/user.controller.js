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

//토큰 정보로 유저 가져오기
userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("토큰이 유효하지 않습니다.");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 회원정보 수정
userController.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthday, profileImage } = req.body;

    if (!name) throw new Error("이름은 필수항목 값입니다.");

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { name, birthday, profileImage },
      { new: true }
    );

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = userController;

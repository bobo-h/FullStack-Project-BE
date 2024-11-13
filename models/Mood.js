// 관리자 유저가 나중에 기분을 추가 할 수 있게 하기 위함
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moodSchema = new Schema({
  name: { type: String, unique: true, required: true }, // 기분 이름
  icon: { type: String, required: true },
});

module.exports = mongoose.model("Mood", moodSchema);

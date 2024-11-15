const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const chatbotSchema = new Schema(
  {
    //userId: { type: mongoose.ObjectId, ref: User },
    userId: { type: Number, required: true, default: 1111 },
    name: { type: String, require: true },
    appearance: { type: String },
    personality: { type: String, required: true },
    // user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 메인화면에서 필요
    // product_id: { type: String, ref: 'Product', required: true }, // 메인화면에서 필요 ->appearance 대체
    // position: {   // 메인화면에서 필요
    //     x: { type: Number, default: 0 },
    //     y: { type: Number, default: 0 },
    //   },
  },
  { timestamps: true }
);

chatbotSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Chatbot = mongoose.model("Chatbot", chatbotSchema);
module.exports = Chatbot;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const chatbotSchema = new Schema({
    //userId: { type: mongoose.ObjectId, ref: User }, 
    userId: { type: Number, required: true, default: 1111 }, 
    name : {type:String, require:true},
    appearance : { type: String },
    personality : { type: String, required: true },
}, 
{ timestamps: true }
);

chatbotSchema.methods.toJSON = function() {
    const obj = this.toObject(); 
    delete obj.__v;
    return obj;
};

const Chatbot = mongoose.model("Chatbot", chatbotSchema);
module.exports = Chatbot;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index"); 
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api", indexRouter);

// MongoDB 연결 설정
const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log("DB connection failed:", err));

// 서버 실행
app.listen(4000, ()=>{
    console.log("server is running on 4000");
});
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./Router");
const routermsg=require("../backend/Routermsg/routermsg");
const cors=require("cors")
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors(
  {
  origin: 'http://localhost:3000', // Specify the allowed origin
  credentials: true // Allow credentials
  }
));
server.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
  mongoose
    .connect("mongodb://localhost:27017/portfolio")
    .then(() => {
      console.log("database is connected");
    })
    .catch((error) => {
      console.log(error);
    });
});

server.use(router);
server.use(routermsg)

const showdatapost=require("../MsgController/msgcontroller");
const express=require("express");
const routermsg=express.Router();

routermsg.post("/showdata",showdatapost);

module.exports=routermsg;
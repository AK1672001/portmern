const mongoose=require("mongoose");
const validator=require("validator")
const messageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required!"],
        minLength:[3,"name length at lest 3 char"]
    },
    email:{
        type:String,
        required:[true,"Email Required!"],
        validate:[validator.isEmail,"Please provide a vild email"]
        
    },Subject:{
        type:String,
        required:[true,"Subject Required!"],
        minLength:[5,"subject length at lest 5 char"]
    },message:{
        type:String,
        required:[true,"message Required!"],
        minLength:[10,"message length at lest 10 char"]
    },

})

const messageData=mongoose.model("messageData",messageSchema);
module.exports=messageData;
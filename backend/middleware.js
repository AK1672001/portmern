const Data=require("./Model");
const jwt=require("jsonwebtoken");
const Authenticate=async(req,res,next)=>{
    try{
      const token=req.header("Auth");
      if(!token)return res.status(200).json({msg:"Please login first"});
      const decode=await jwt.verify(token,"RT#$&%");
      const id=decode.userId;
      const user=await Data.findById(id);
      if(!user)
       return res.status(200).json({msg:"user not exist"});
       req.Auth=user;
       next();
    }
    catch(err){
        res.status(200).json({err:"invalid authenticate error"})
    }
}

module.exports=Authenticate;
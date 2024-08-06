const messageData=require("../Model/messagemodel");
const showdatapost=async(req,res)=>{
    const{name,email,Subject,message}=req.body;
    if(!name||!email||!Subject||!message)return res.status(200).json({msg:"please fill all the fields",success:false,statusCode:400})
    console.log("data here",name,email,Subject,message);
    try{
         const user=  new messageData({
            name,
            email,
            Subject,
            message
         })
        //  console.log("datauser",user)
         await  user.save();
          console.log("datauserdata",user)
         res.status(200).json({msg:"successfully message send",success:true,user});
    }
    catch(error){
        if (error.name === 'ValidationError') {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                success: false,
                msg: errors,
                statusCode: 400
            });
        }
        return res.status(500).json({
            success: false,
            msg: "An unexpected error occurred",
            statusCode: 500
        });
    }
}

module.exports=showdatapost;
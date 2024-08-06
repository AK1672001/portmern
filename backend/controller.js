const Data = require("./Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registration = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if(!name||!email||!password)return res.status(200).json({msg:"please fill all the details"})
    const user = await Data.findOne({ email });

    if (user) return res.status(200).json({ msg: "Email already registered!",user:user,statusCode:409 });
    const haspassword = await bcrypt.hash(password, 10);
    const data = await new Data({
      name,
      email,
      password: haspassword,
    });

    const data1 = await data.save();
   
    res.status(200).json({ msg: "Successfully register", data1: data1 });
  } catch (err) {
    res.status(500).json({ err: "Invalid registration error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email||!password)return res.status(200).json({msg:"please fill all the details"})
  try {
    
    const user = await Data.findOne({ email });
    if (!user) return res.status(200).json({ msg: "user not exist" });
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword)
      return res.status(200).json({ msg: "invalid password" });
    const token = await jwt.sign({ userId: user._id }, "RT#$&%", {
      expiresIn: "1d",
    });
    res.status(200).json({ msg: `login successfully ${user.name}`, token, statusCode:200});
  } catch (err) {
    res.status(200).json({ error: "invalid login error" });
  }
};
const logout=async(req,res)=>{
    res.clearCookie("jwt",{path:"/"});
    res.status(200).json({msg:"user logout"});
}
module.exports = { registration, login,logout };

const Users = require("../../modal/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sendMail = require("../../utils/sendMail");
const users = require("../../modal/users");

exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const isEmail = await Users.findOne({ email: email });

  if (isEmail) {
    res.status(400);
    throw new Error({ success: false, message: "email already exist!" });
  }
  if (password != confirmPassword) {
    res.status(400);
    throw new Error({ success: false, message: "password not matched!" });
  }

  let token = await jwt.sign(
    { email, lastName, firstName, password },
    "112345", {expiresIn: "3m"}
  );
   const url= `https://racing-t8qw.onrender.com/activation/https://racing-t8qw.onrender.com/activation/${token}`;
  const message = `Hello ${firstName + lastName} <br /> click on the link below to verify your email <br /> <a href=${url} style="background-color: blue; padding: 10px 15px; color: "#fff'">confirm</a>`

  sendMail({
    email: email,
    subject: "Gart account activation",
    message: message,
  });
  res.send({
    success: true,
    message: message,
  });
});



exports.activation = asyncHandler(async(req,res) =>{
      const {payload} = req.body;
      const user = await jwt.verify(payload,"112345");
      const validEmail = await Users.findOne({
        email
      });
if(validEmail){
  res.status(400)
  throw new Error("Email already exist");
};
const enPassword = await bcrypt.hash(user.password, 10);
const createUser = await Users.create({
  ...user,
  password:enPassword
});
if(!createUser){
  res.status(400)
  throw new Error("Internal server error")
};
res.status(201).json({
  success:false,
  message:user,
  token: token
})  
})

// exports.login = (req,res) =>{

// }

// exports.loginPage = (req,res) =>{

// }

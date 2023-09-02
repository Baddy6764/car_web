const Users = require("../../modal/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sendMail = require("../../utils/sendMail");
const users = require("../../modal/users");
const { baseurl } = require("../../baseurl");

exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const isEmail = await Users.findOne({ email: email });

  if (isEmail) {
    res.status(400);
    throw new Error("email already exist!");
  }

  let token = await jwt.sign(
    { email, lastName, firstName, password,},
    "112345",
    { expiresIn: "15m" }
  );
  const url = `${baseurl}/activation/${token}`;
  const message = `
  <h4>Hello</h4>
   <h2>${firstName + " " + lastName}</h2>
    <h4>click on the link below to verify your email</h4>
     <br />
      <a href=${url} style=" background-color: "blue"; padding: "10px 15px"; color: "#fff"; " >Confirm</a>
  `;

  sendMail({
    email: email,
    subject: "Gart account activation",
    message: message,
  });
  res.send({
    success: true,
    message: "verification message have been send to your email",
  });
});

exports.activation = asyncHandler(async (req, res) => {
  const { payload } = req.body;
  const user = await jwt.verify(payload, "112345");
  const validEmail = await Users.findOne({
    email: user.email,
  });
  if (validEmail) {
    res.status(400);
    throw new Error("Email already exist");
  }
  const enPassword = await bcrypt.hash(user.password, 10);
  const createUser = await Users.create({
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    role:false,
    password: enPassword,
     });
  if (!createUser) {
    res.status(400);
    throw new Error("Internal server error");
  }
  res.status(201).json({
    success: true,
    message: user,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.status(200).send(req.body);
  const user = await Users.findOne({
    email: email,
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ user }, "112345");
  return res
    .cookie("access", token, {
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .json({
      message: "success",
      data: {
        token: token,
        user: user,
      },
    });
});

exports.forgetPassword =  asyncHandler(async(req,res)=>{
  const {email,firstName} = req.body;
  const user = Users.findOne({
    email:email,
  })
  if(!user){
    res.status(400).json({error:"Invalid email"});
  };
  const token = await jwt.sign({email},"12345",{expiresIn:"10m"});
  const url = `${baseurl}/retrive-password/${token}`
  const message = `
<h2 style="color:green;">Hello,</h2>
<p>Click on the link below to reset your password; <a style="color:brown;" href="${url}">reset</a> password.</p>
<h3>Please if you didn't request for this contact our support immediately.</h3>
<p>Thank you.</p>
  `
  sendMail({
    email:email,
    from:"usman@gmail.com",
    subject:`Reset Password`,
    message:message,

  });
  res.send({
    success:true,
    message:"reset password has been sent to your email"
  });
})

exports.retrivePassword = asyncHandler(async (req,res)=>{
const {token, newPassword, confirmPassword} = req.body;
const decoded = await jwt.verify(token,"12345");
// if(err){
//   res.status(400)
//   throw new Error("Invalid Token");
// }
if(!decoded){
  res.status(400)
  throw new Error("Invalid Token");
}
const user = await Users.findOne({
  email:decoded.email
})
if(!user){
  res.status(400)
  throw new Error("Email id not valid");
}

if(newPassword !== confirmPassword){
  res.status(400)
  throw new Error("Password do not match")
}
const hashedPassword = await bcrypt.hash(newPassword, 13);

user.password = hashedPassword

await user.save()

res.status(201).json({
  success: true,
  userInfo:user,
  message: "password reset successfully"
})
// const saveUser = Users.updateOne({
//   password:newPassword,
// })
// if(!saveUser){
//   res.status(401)
//   throw new Error("User not save")
// }
})
exports.updateCars = asyncHandler (async (req,res)=>{

})

exports.updatePassword = asyncHandler (async (req,res)=>{

})



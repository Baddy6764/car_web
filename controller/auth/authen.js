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

  const token = await jwt.sign(
    { email, lastName, firstName, password },
    "112345"
  );

  sendMail({
    email: email,
    subject: "Gart account activation",
    message: token,
  });

  const hashPassword = await bcrypt.hash(password, 13);
  const user = await users.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: hashPassword,
  });

  res.send({
    success: true,
    message: "Verification link have been sent to your email",
    data: user,
    token: email,
  });
});
// exports.registerPage = (req,res) =>{

// }

// exports.login = (req,res) =>{

// }

// exports.loginPage = (req,res) =>{

// }

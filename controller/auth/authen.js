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
    { email, lastName, firstName, password,role:"Admin" },
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

exports.login = asyncHandler(async (err, req, res) => {
  const { email, password } = req.body;
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
  res
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
  if (err) {
    console.log(err);
  }
  return;
});

// exports.forgotPassword = (req,res)=>{
//   const {Email} = req.body;

//   }

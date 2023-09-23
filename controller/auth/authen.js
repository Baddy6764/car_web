const Users = require("../../modal/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sendMail = require("../../utils/sendMail");
// const users = require("../../modal/users");
const { baseurl } = require("../../baseurl");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const localStratey = require('passport-local').Strategy
const passport = require("passport");
require("dotenv").config()

////Register Route
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

/////Activate Register Route
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

/////Login Route
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

/////Forgot Password Route
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


//////Retrieve Password Route
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
  throw new Error("Email is not valid");
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

//////Update Password Route
exports.updatePassword = asyncHandler (async (req,res)=>{
const {oldPassword, newPassword, conNewPassword,} = req.body;
const tokenUser = await req.header.token;
const decoded = await jwt.verify(tokenUser,"12345");
if(!decoded){
  res.status(400).json({error:"Invalid token user"});
}
const userOne =  await Users.findOne({email:decoded.email}).select("+password");
if(!userOne){
  res.status(400).json({error:"User not found || Invalid Email"});
}
if(oldPassword === newPassword){
  res.status(401).json({error:"Password must not match the new password"});
}
if(newPassword !== conNewPassword){
  res.status(401).json({error:"password not match"})
}
const hashnewPass = await bcrypt.hash(newPassword,13)
userOne.password = hashnewPass
await userOne.save()
res.status(401).json({
  success:true,
  message:"password updated successfully",
  // userInfor:userOne
})
})


///// Local Password Login
// passport.use(new localStratey(
//   function(email,password,done){
//  Users.findOne({email:email},(err,user)=>{
//   if(err){
//       return done(err);
//   }
//   if(!user || !user.verifyPassword(password)){
//       return done(null,false,{message:"Invalid credentials"});
//   }
//   return done(null,user);
//  })
//   }
// ))

// const user = Users.findOne({email:email})
//  if(!user){
  
//  }
 
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CLIENT_ID = "829754950475-dtkr2j0bf0sn1htrcmjs4arhmbo9jnfn.apps.googleusercontent.com"


///Google Authentication
passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL: "https://gart-api.onrender.com/auth/google",
    passReqToCallback   : true
  },
   async (request, accessToken, refreshToken, profile, done)=>{
  try{
    const Email = await profile.emails[0].value;
    const FirstName = await profile.name['givenName'];
    const lastName = await profile.name['familyName'];
    const existingUser = await Users.findOne({email:Email})

    console.log(profile);
// console.log(`Existing User ${existingUser}`);

 if(existingUser){
  return done(null,existingUser)
 }
 
// console.log(`firstName:${FirstName} lastName:${lastName}`);


 const newUsers = await Users.create({
    firstname:FirstName,
    lastname:lastName || false,
    email:Email,
    password:false,
 })
//  console.log(newUsers);

if(newUsers){
  console.log("user created");
}
  done(null, newUsers);
  } catch(err){
    console.log(err)
  }
  }
));


/////Serialize
passport.serializeUser(async(user,done)=>{
   try{
    const users = await user
    // console.log("serializeUser",users);
    done(null,users);
   } catch(err){
    console.log(err)
    done(err);
   }
})

/////Deserialize
passport.deserializeUser((id,done)=>{
    const userId = Users.findById({id:id});
    if(!userId){
      return done(null,"not found")
    }
 return   done(null, userId);
})

// exports.RegisterEJs = (req,res)=>{

//   res.send('<a href="http://localhost:5000/auth/google" >Authentication with google</a>')
// }

// exports.googleCallback = (req,res)=>{
// const user = req.user
// if(!user){
//   console.log("user not found")
//   return res.redirect("/failed");
// }
//   res.redirect('/protected')

// console.log("users");
// }

// exports.failed = (req,res)=>{
 
// }

// exports.protected = (req,res)=>{
//    res.send('Good job!!! This route has been authenticated');
// }


/////Google Authentication Route
exports.googleAuth = async(req,res)=>{
try{
  const user = await req.user
  if(!user){
     res
     .status(400)
     .json({error:"User not found"});
  }
 
  if(user){
 res.redirect("https://gart-racing.netlify.app/dashboard");

  }
  // const token = await jwt.sign({user},"12345")
  // res
  // .cookie("access",token,{
  //    httpOnly:true,
  //    secure:false
  // })
  // .status(200)
  // .json({
  //    message:"success",
  //    data:{
  //       token:token,
  //       user:user
  //    }
  // })



  // console.log(user);
    // if(!user){
    //    console.log("user not found")
    //    return res.redirect("/failed");
    // }
    //    res.redirect('/protected')
    
    // console.log("users");
}catch(err){
  console.log(err);
}
}

// exports.failed = async (req,res)=>{
// res.send("Failed Authentication");
// }

// exports.protected = async (req,res)=>{
// res.send("Protected route");
// }

exports.googleCallback =  (req, res)=>{

}
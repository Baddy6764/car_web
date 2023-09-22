// const { check } = require("-validator");
const router = require("express").Router()
const adminController = require("../controller/admin");
const authen = require("../controller/auth/authen");
// const isAuth = require('../middlewares/isAuth');
// const isAdmin = require('../middlewares/isAdmin');
const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const jwt = require("jsonwebtoken");
// const dataJson = require("../Data/data.json");
// const Users = require("../modal/users");
// const axios = require("axios")

router.post("/register-page",authen.register);

router.post("/activation", authen.activation);

router.post("/login-page", authen.login);

router.post('/forget-password',authen.forgetPassword);

router.post('/retrive-password',authen.retrivePassword);

router.post('/update-cars',adminController.updateCars);

router.post('/update-password',authen.updatePassword);

router.post("/cars/data",adminController.datajson);

router.get("/",adminController.HomePage);

// router.get("/google/callback",passport.authenticate('google',{successRedirect:"protected",failureRedirect:"failed"}),authen.googleCallback)

router.get("/failed",authen.failed);

router.get('/protected',authen.protected);




router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}),authen.googleAuth);

router.post('/register/car',adminController.Registercars);


// router.post("/nyname",(req,res)=>{
//     res.send({firstName:"Usman",lastName:"Abdulrahmon"})
// })

// router.get("/thisigup",(req,res)=>{
//     res.send("Sign up")
// })
// router.get("/this",isAdmin,(req,res)=>{
//     res.send("ghdsvdsvsdvhdfvhfvhfdkhfd")
// })

// router.get('/forgot-password',authen.forgotPassword);





module.exports = router;

const Users = require("../modal/users");
const carsDetails = require("../modal/carsDetails");
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const session = require('express-session');
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const localStratey = require('passport-local').Strategy
const jwt = require("jsonwebtoken");
const dataJson = require("../Data/data.json");
const asyncHandler = require("express-async-handler");
// const { default: mongoose } = require("mongoose");
// const { json } = require("body-parser");






exports.datajson = (req,res)=>{
res.status(200).json({data:dataJson})
}



exports.Registercars =  (req,res)=>{
//   const {make, model, generation,  engine,videos,images} = req.body
console.log(req.file);
}

exports.updateCars = asyncHandler (async (req,res)=>{
   
})

// exports.Registercar = (req,res)=>{
//   // res.status(200).send(
//   //   "<h1>Upload A Image </h1><br><input type='file' placeholder='upload image' >",
//   //   // "<input type='file' placeholder='upload image' >"
//   //   );
// }
// exports.HomePage = (req,res)=>{
//     res.send({name:"Uncle Johnson"});
//   }
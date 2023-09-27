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







exports.datajson = (req,res)=>{
res.status(200).json({data:dataJson})
}



exports.Registercars =  (req,res)=>{
//   const {make, model, generation,  engine ,videos ,images} = req.body
const bo = req.body.files
console.log(req.files)
res.status(200).json({bo})
}

exports.updateCars = asyncHandler (async (req,res)=>{
   
})


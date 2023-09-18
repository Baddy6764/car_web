// const Users = require("../modal/users");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const session = require('express-session');
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const localStratey = require('passport-local').Strategy
// const jwt = require("jsonwebtoken");
const dataJson = require("../Data/data.json");
const asyncHandler = require("express-async-handler");
// const { default: mongoose } = require("mongoose");
// const { json } = require("body-parser");






exports.datajson = (req,res)=>{
res.status(200).json({data:dataJson})
}



exports.Registercars = (req,res)=>{
    
}

exports.updateCars = asyncHandler (async (req,res)=>{

})

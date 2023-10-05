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



exports.Registercars =  async(req,res)=>{
    try{
        const {Images, video, engine, generation, make, model} = await req.body;
        res.status(200).json({data:Images});
//         const tokenUser = await req.header.token;
//        const decoded = jwt.verify(tokenUser,'12345');
//        if(Images){
//         res.status(400).json(req.Images);
//        }
//        if(!decoded){
//         return res
//         .status(401)
//         .json({error:"User not found"});
//        }
//        if(!Images || !video || !engine || !generation || !make || !model){
//         return res
//         .status(401)
//         .json({error:"Invalid request car Information"});
//        }
//     let Image = [];

//    Images.map(value =>{
//     return Image.push(value.file.filename);
//    })
     
//    const createCars = carsDetails.create({
//     Make:make,
//     Model:model,
//     Generation:generation,
//     Engine:engine,
//     images:Image,
//     Video:video
//    })
//     if(!createCars){
//         return res
//         .status(400)
//         .json({error:"user car not created"})
//     }
//     return res
//     .status(200)
//     .json({message:"user car created successfully",data:createCars});
    } catch (err){
        console.log(err);
    }
}

exports.updateCars = asyncHandler (async (req,res)=>{
   
})

exports.adminPanel = (req,res)=>{
    
}

exports.approveCar = async(req,res)=>{

}

exports.deleteCar = (req,res)=>{

}

exports.rejectCar = (req,res)=>{

}


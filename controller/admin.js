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
const { json } = require("body-parser");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:'dv3u1kjgh',
  api_key:'963794852632416',
  api_secret:'WlJeFUD6F9cjTEqLjTRFXs_kL9U'
})


exports.datajson = (req, res) => {
  res.status(200).json({ data: dataJson });
};

exports.Registercars =  async(req, res) => {
  try {
    const { engine, generation, make, model } =  req.body;

    if (!engine || !generation || !make || !model) {
      return res.status(400).json({ error: "Invalid request car Information" });
    }

      const videosFile  = req.files.video;
      const imagesFiles =  req.files.images;

      if(!videosFile || !imagesFiles){
        return res.status(400).json({error:"Videos or Images not uploaded"});
      }

      const imageFile = imagesFiles[0];

      if(!imageFile.buffer){
        return res.status(400).json({error:"Image buffer not found"})
      }

      cloudinary.uploader.upload(imageFile.buffer, {resource_type:"images"},(error,result)=>{
        if(error){
          res.status(400).json({err:error})
        }else{
          res.status(400).json({imageResult:result})
        }
      })



      

      // const videoFile = videosFile[0];

      // if(!videoFile){
      //   res.status(400).json({error:"No video File"})
      // }

      // cloudinary.uploader.upload_stream(
      //   {resource_type:"video"},
      //   (result)=>{
      //     res.status(200).json({result})
      //   }
      // ).end(videoFile.buffer)



  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: "An error occured in creating user car" });
  }
};


exports.updateCars = asyncHandler(async (req, res) => {});

exports.adminDasboard = (req, res) => {};

exports.approveCar = async (req, res) => {
  try {
    const {carId} = req.body;
    if (!carId) {
      return res.status(400).json({ error: "Invalid carId" });
    }
    const updatedCar = await carsDetails.findByIdAndUpdate(
      carId,
      { status: true },
      // { new: true }
    );
    if (!updatedCar) {
      return res
        .status(400)
        .json({ error: "An error occur when updating the car" });
    }
    return res.status(200).json({ message: "Car status updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to update car status" });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const  Id  = req.body;
    if (!Id) {
      return res.status(400).json({ error: "Invalid car Id" });
    }
    const deletedCar = await carsDetails.findByIdAndDelete(Id);
    if (!deletedCar) {
      return res.status(400).json({ error: "Failed to delete car" });
    }
    return res.status(200).json({ message: "car deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occure when deleting car" });
  }
};

exports.rejectCar = async (req, res) => {
  try {
    const  Id  = req.body;
    if (!Id) {
      res.status(400).json({ error: "Invalid carId" });
    }
    const rejectedCar = await carsDetails.findByIdAndRemove(Id);
    if (!rejectedCar) {
      return res.status(400).json({ error: "Failed to reject car" });
    }
    return res
      .status(200)
      .json({ message: "car has successfully been rejected" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occure when rejecting car" });
  }
};

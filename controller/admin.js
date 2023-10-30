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


exports.datajson = (req, res) => {
  res.status(200).json({ data: dataJson });
};

exports.Registercars =  (req, res) => {
  try {
    const { engine, generation, make, model } =  req.body;

    if (!engine || !generation || !make || !model) {
      return res.status(400).json({ error: "Invalid request car Information" });
    }
      const videoFiles  = req.files.video[0].filename;
      const imagesFiles = req.files.images;

      if(!videoFiles || !imagesFiles){
        return res.status(400).json({error:"videos and images not uploaded"});
      }
      

    // let Image = [];

    // imagesFiles.map((value) => {
    //   return Image.push(value.file.filename);
    // });
    res.status(200).json({video:videoFiles,image:imagesFiles});

    const createdCars = carsDetails.create({
      Make: make,
      Model: model,
      Generation: generation,
      Engine: engine,
      // images: Image,
      // Video: videoFiles,
      
    });
    if (!createdCars) {
      return res.status(400).json({ error: "user car not created" });
    }
     res
      .status(200)
      .json({ message: "user car created successfully", });
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

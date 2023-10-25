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
    const { images, video, engine, generation, make, model } =  req.body;
    res.status(200).send(video);
    // const tokenUser =  req.header("token");
    // const decoded = jwt.verify(tokenUser, "12345");
    // if (!decoded) {
    //   return res.status(401).json({ error: "User not found" });
    // }
    // if (!images || !video || !engine || !generation || !make || !model) {
    //   return res.status(401).json({ error: "Invalid request car Information" });
    // }
    // let Image = [];

    // images.map((value) => {
    //   return Image.push(value.file.filename);
    // });

    // const createCars = carsDetails.create({
    //   Make: make,
    //   Model: model,
    //   Generation: generation,
    //   Engine: engine,
    //   images: Image,
    //   Video: video,
    // });
    // if (!createCars) {
    //   return res.status(400).json({ error: "user car not created" });
    // }
    //  res
    //   .status(200)
    //   .json({ message: "user car created successfully", data: createCars });
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

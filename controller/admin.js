const Users = require("../modal/users");
const carsDetails = require("../modal/carsDetails");
const jwt = require("jsonwebtoken");
const dataJson = require("../Data/data.json");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");




exports.datajson = (req, res) => {
  res.status(200).json({ data: dataJson });
};



exports.Registercars = async (req, res) => {
  try {
    const { engine, generation, make, model } = req.body;

    if (!engine || !generation || !make || !model) {
      return res.status(400).json({ error: "Invalid request car Information" });
    }

    const videoFile = req.files.video;

    const imagesFiles = req.files.images;

    if (!videoFile || !imagesFiles || imagesFiles.length !== 2) {
      return res
        .status(400)
        .json({ error: "Videos or Images not uploaded correctly" });
    }
     
   
    const imageFile = imagesFiles[0];

    const imageFileTwo = imagesFiles[1];

    let videoUploaded, resultTwo, imageFileUploaded;

    const uploadImageToCloudinary = async (dataUrl) => {
      try {
        return await cloudinary.uploader.upload(dataUrl, {
          resource_type: "image",
        });
      } catch (error) {
        throw new Error("Error occur uploading image");
      }
    };

    const uploadImageTwoToCloudinary = async (ImageTwodataUrl) => {
      try {
        return await cloudinary.uploader.upload(ImageTwodataUrl, {
          resource_type: "image",
        });
      } catch (error) {
        throw new Error("Error occur uploading image two");
      }
    };

    const vdFile = videoFile[0];

    if (!vdFile) {
      return res.status(400).json({ error: "No video File" });
    }

    const uploadVideoToCloudinary = async (videoDataUrl) => {
      try {
        return await cloudinary.uploader.upload(videoDataUrl, {
          resource_type: "video",
        });
      } catch (error) {
        throw new Error("Error occur uploading video");
      }
    };

    const b64 = Buffer.from(imageFile.buffer).toString("base64");

    let dataUrl = "data:" + imageFile.mimetype + ";base64," + b64;

    const ImageTwob64 = Buffer.from(imageFileTwo.buffer).toString("base64");

    let ImageTwodataUrl =
      "data:" + imageFileTwo.mimetype + ";base64," + ImageTwob64;

    const Vdb64 = Buffer.from(vdFile.buffer).toString("base64");

    let videoDataUrl = "data:" + vdFile.mimetype + ";base64," + Vdb64;

    resultTwo = await uploadImageTwoToCloudinary(ImageTwodataUrl);

    imageFileUploaded = await uploadImageToCloudinary(dataUrl);

    videoUploaded = await uploadVideoToCloudinary(videoDataUrl);

    if (!resultTwo || !imageFileUploaded || !videoUploaded) {
      return res
        .status(400)
        .json({
          error:
            "No resultTwo data & imageFileUploaded data && videoUploaded data",
        });
    }


    const createdUserCar = await carsDetails.create({
      Make: make,

      Model: model,

      Generation: generation,

      Engine: engine,

      secure_url_cloudinary_image: imageFileUploaded.secure_url,

      public_Id_cloudinary_image: imageFileUploaded.public_id,

      secure_url_cloudinary_imageTwo: resultTwo.secure_url,

      public_Id_cloudinary_imageTwo: resultTwo.public_id,

      secure_url_cloudinary_Video: videoUploaded.secure_url,

      public_Id_cloudinary_Video: videoUploaded.public_id,
    });

    if (!createdUserCar) {
      return res.status(400).json({ error: "user car not created" });
    }

    res.status(200).json({
      message: "car details added successfully",
      videoUrl: videoUploaded.secure_url,
      ImageOneUrl: imageFileUploaded.secure_url,
      ImageTwoUrl: resultTwo.secure_url,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal sever error" });
  }
};

exports.updateCars = asyncHandler(async (req, res) => {});

exports.adminDasboard = (req, res) => {};

exports.approveCar = async (req, res) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      return res.status(400).json({ error: "Invalid carId" });
    }

    if(typeof carId !== "string"){
      return res.status(400).json({error:"please provide invalid car"})
    }

    const updatedCar = await carsDetails.findByIdAndUpdate(
      carId,
      { status: true },
      { new: true }
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

exports.getRegisterCars = async (req,res)=>{
  try{
  const  userCarDetails = await carsDetails.find();
    
   if(!userCarDetails){
   return res.status(400).json({error:"no user car"});
   }
   console.log(userCarDetails)

    res.status(200).json({data:userCarDetails});

  } catch(err){
    res.status(500).json({error:err.name})
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const {carId} = req.params;

    // if (!Id) {
    //   return res.status(400).json({ error: "Invalid car Id" });
    // }

    // const deletedCar = await carsDetails.findByIdAndDelete(Id);

    // if (!deletedCar) {
    //   return res.status(400).json({ error: "Failed to delete car" });
    // }

    return res.status(200).json({ carId });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "An error occure when deleting car" });
  }
};

exports.rejectCar = async (req, res) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      return res.status(400).json({ error: "Invalid carId" });
    }

    if(typeof carId !== "string"){
      return res.status(400).json({error:"please provide invalid car"})
    }

    const rejectedCar = await carsDetails.findByIdAndRemove(carId);
    if (!rejectedCar) {
      return res.status(400).json({ error: "car not found" });
    }

    res.status(200).json({ rejectedCar });
  } catch (err) {
    // console.log(err);

    return res.status(500).json({ error: "An error occur" });
  }
};

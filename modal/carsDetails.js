const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  Make: {
    type: String,
    require: false,
  },

  Model: {
    type: String,
    require: false,
  },

  Generation: {
    type: String,
    require: false,
  },

  Engine: {
    type: String,
    require: false,
  },

  secure_url_cloudinary_images: {
    type: String,
    require: false,
  },

  public_Id_cloudinary_images: {
    type: String,
    require: false,
  },

  secure_url_cloudinary_Video: {
    type: String,
    require: false,
  },

  public_Id_cloudinary_Video: {
    type: String,
    require: false,
  },

  status:{
   type: String,
   default: "pending"
  }
});

module.exports = mongoose.model("Cars", carSchema);

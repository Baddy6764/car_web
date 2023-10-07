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

  images: {
    type: String,
    require: false,
  },

  Video: {
    type: String,
    require: false,
  },
  status:{
   type:Boolean,
   default:false
  }
});

module.exports = mongoose.model("Cars", carSchema);

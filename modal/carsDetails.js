const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
   Make:{
    type:String,
    require:false
   },

   Model:{
   type:String,
   require:false
   },

   Generation:{
    type:String,
    require:false
   },

   Engine:{
    type:String,
    require:false,
   },

   Images:{
    type:String,
    require:false,
   },
   
   Videos:{
    type:String,
    require:false
   }
});

module.exports = mongoose.model("Cars", carSchema);
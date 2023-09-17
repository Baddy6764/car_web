const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // unique: true,
  },
  role:{
    type:String,
    default:false,
  },
   password: {
    type: String,
    required: true,
  },
  // googleId:{
  //   type: String,
  //   required: true,
  // },
  // displayName:{
  //   type: String,
  //   required: true,
  // }
  //     gender:{
  //         type:sequelize.STRING,
  //         allowNull:true
  //     },
  //     dob:{
  //         type:sequelize.STRING,
  //         allowNull:true
  //     },
  //     address:{
  //         type:sequelize.STRING,
  //         allowNull:true,
  //     },
  //     city:{
  //         type:sequelize.STRING,
  //         allowNull:true
  //     },
  //     state:{
  //         type:sequelize.STRING,
  //         allowNull:true,
  //     },
  //     zipcode:{
  //         type:sequelize.TEXT,
  //         allowNull:true,
  //     },
  //     profilepic:{
  //         type:sequelize.CHAR,
  //         allowNull:true,
  //     },
  //     images:{
  //         type:sequelize.STRING,
  //         allowNull:true
  //     },
  //     videos:{
  //       type:sequelize.CHAR,
  //       allowNull:true,
  //     },
  //    carname:{
  //     type:sequelize.CHAR,
  //     allowNull:true,
  //    },
  //    series:{
  //     type:sequelize.CHAR,
  //     allowNull:true,
  //    },
  //    chassis:{
  //     type:sequelize.CHAR,
  //     allowNull:true
  //    },
  //    engine:{
  //     type:sequelize.CHAR,
  //     allowNull:true
  //    },
  //    model:{
  //     type:sequelize.CHAR,
  //     allowNull:true,
  //    },
  //    generation:{
  //     type:sequelize.STRING,
  //     allowNull:true
  //    },
  //    drivetrain:{
  //     type:sequelize.STRING,
  //     allowNull:true
  //    },
  //    employment:{
  //     type:sequelize.CHAR,
  //     allowNull:true
  //    }
});
module.exports = mongoose.model("Users", UserSchema);

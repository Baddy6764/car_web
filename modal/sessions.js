const Sequelize = require('../db/connect');
const sequelize = require('sequelize');
const session = Sequelize.define('session',{
    sid:{
        type:sequelize.STRING,
        primaryKey:true,
    },
    userId:{
        type:sequelize.STRING,
    },
    data:{
        type:sequelize.TEXT
    },
    expires:{
        type:sequelize.DATE
    }
});
module.exports=session;
const Sequelize = require('sequelize');
const connect = new Sequelize('userData','root',"",{
    host:'localhost',
    dialect:'mysql'
});
module.exports=connect;
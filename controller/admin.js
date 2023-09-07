const dataJson = require("../Data/data.json");

exports.datajson = (req,res)=>{
res.status(200).json({data:dataJson})
}
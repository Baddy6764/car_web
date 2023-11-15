const multer = require("multer");

/////Using Multer to store Images/Videos
const storage = multer.memoryStorage();

/////Multer Storage
const upload = multer({ storage: storage });

module.exports = upload;

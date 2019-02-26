const config = require('../config/database');
var multer  =   require('multer');
var moment  =   require('moment');
var path = require('path');
const mongoose = require('mongoose');

//multer
var filename_path;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },

  filename: function (req, file, callback) {
    ////console.log(req);
    filename_path=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage}).single('image');
var multiple_upload = multer({ storage : storage}).array('image');


//adding items

const Add_Items={

};


module.exports=Add_Items;

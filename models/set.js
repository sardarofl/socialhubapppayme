const config = require('../config/database');
const mysql = require('mysql');
var path = require('path');
const mongoose = require('mongoose');
var multer  =   require('multer');
//adding items

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
const Set={


};


module.exports=Set;

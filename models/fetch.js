const config = require('../config/database');
const mysql = require('mysql');
const mongoose = require('mongoose');
const Posts_schema = require('./posts_schemas');
const Fetch = require('../models/fetch');

const Fetch_Items={

  getAllPosts : function(query, callback){
    
    let querylimit =parseInt( query.limit);
    Posts_schema.find(query.filter, callback).limit(querylimit);
  
  }
};


module.exports=Fetch_Items;

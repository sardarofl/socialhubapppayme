const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  account_ID:{
    type:String,
    required:true
  },
  max_number_of_rooms:{
    type:Number
  },
  isAdmin:{
    type:Boolean
  },
  workgroupID:{
    type:String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id,callback);
}

module.exports.getUserByUsername = function(email, callback){
  const query = {email:email};
  User.findOne(query,callback);
}

module.exports.setUserPassword = function(user, callback){
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(user.password,salt, (err,hash)=>{
      if(err) throw err;
      user.password = hash;
      console.log('finding user',user)
      User.findByIdAndUpdate(user.asfjl,{ $set: { 'password': user.password }},callback);
    });
  });
}

module.exports.setUserNOPassword = function(user, callback){
  console.log('finding user',user)
      User.findByIdAndUpdate(user.asfjl,{ $set: {  'name':user.name , 'email':user.email, 'username':user.username ,'workgroupID':user.workgroupID}},callback);

}
module.exports.setUserWithPassword = function(user, callback){
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(user.password,salt, (err,hash)=>{
      if(err) throw err;
      user.password = hash;
      console.log('finding user',user)
      User.findByIdAndUpdate(user.asfjl,{ $set: { 'password': user.password , 'name':user.name,'email':user.email,'username':user.username ,'workgroupID':user.workgroupID}},callback);
    });
  });
}

module.exports.addUser = function(newUser, callback){
  //console.log(newUser);
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(newUser.password,salt, (err,hash)=>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUsersByAccountID = function( account_ID, callback){
  //console.log(account_ID);
  User.find({account_ID:account_ID ,isAdmin: { $ne: true }} ,callback);

}

module.exports.getAdminUsers = function(  callback){
  //console.log(account_ID);
  User.find({ isAdmin:true } ,callback);

}

module.exports.DeleteFromUsers = function(id, res, callback){
  var data = {
    "Data":""
  };
  User.remove({_id:id},callback);
}

module.exports.getDuplicateEmails = function( user_email, callback){
  User.find({email:user_email},callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
    if(err) throw err;
    callback(null, isMatch);
  });
}

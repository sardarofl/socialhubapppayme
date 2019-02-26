const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

function verifyToken(req,res,next){
	
	const bearerHeader = req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ');
		//get token from array
		const bearerToken = bearer[1];
		req.token = bearerToken;
		//next middle ware
		next();
	}else{
		res.sendStatus(403);
	}
}

//Register
router.post('/register',(req,res,next) => {
  user_email = req.body.email.toLowerCase();
  let newUser = new User({
    name:req.body.name,
    email:user_email,
    username:req.body.username,
    password:req.body.password,
    account_ID:req.body.account_ID,
    max_number_of_rooms:req.body.max_number_of_rooms,
    isAdmin:req.body.isAdmin,
    isSuperAdmin:req.body.isSuperAdmin,
    workgroupID:req.body.workgroupID
  });

  User.addUser(newUser, (err, user) =>{
    if(err){
      res.json({success:false, msg:'Failed to register user',userID:user.accountID});
    }else{
      console.log("returning user ID");
      console.log(user.accountID);
      res.json({success:true, msg:'User updated',userID:req.body.account_ID});
    }
  });

});

router.put('/update_user',(req,res)=>{

  console.log(req);
  let exsiting_user = {
    asfjl:req.body.accountID,
    password:req.body.password
  }
  console.log("exsisting user",exsiting_user)
  User.setUserPassword(exsiting_user, (err, user) =>{
    //console.log(req);
    //console.log("User",user)
    if(err){
      res.json({success:false, msg:'Failed to update user',userID:req.body.accountID});
    }else{
      console.log("returning user ID");
      console.log(req.body.accountID);
      res.json({success:true, msg:'User registered',userID:req.body.accountID});
    }
  });

});

router.put('/update_user_complete',(req,res)=>{

  // console.log(req);
  var exsiting_user;
  if(typeof req.body.password !== 'undefined'){
     exsiting_user = {
      asfjl:req.body.accountID,
      password:req.body.password,
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      workgroupID:req.body.workgroupID
    }
    User.setUserWithPassword(exsiting_user, (err, user) =>{

      if(err){
        res.json({success:false, msg:'Failed to update user',userID:req.body.accountID});
      }else{
        console.log("returning user ID");
        console.log(req.body.accountID);
        res.json({success:true, msg:'User registered',userID:req.body.accountID});
      }
    });
  }else{
    console.log('no password')
   exsiting_user = {
      asfjl:req.body.accountID,
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      workgroupID:req.body.workgroupID
    }
    User.setUserNOPassword(exsiting_user, (err, user) =>{
  
      if(err){
        res.json({success:false, msg:'Failed to update user',userID:req.body.accountID});
      }else{
        console.log("returning user ID");
        console.log(req.body.accountID);
        res.json({success:true, msg:'User registered',userID:req.body.accountID});
      }
    });
  }

  
 

});
//Register
router.get('/duplicate_email_check/:user_email',(req,res) => {

  var user_email = req.params.user_email;
  user_email = user_email.toLowerCase();
  User.getDuplicateEmails(user_email,function(err,callback){
    if(err){
      res.json({success:false, msg:'No Duplicate email'});
    } else{

      res.json(callback);
    }
   });
 

});

//Register
router.post('/add_rooms_to_users:accountID',(req,res,next) => {

  var accountID = req.params.accountID;
  console.log("adding Rooms to users");
  console.log(req);
  console.log(accountID);
  User.addRoomsToUsers(req,accountID, (err, user) =>{
    if(err){
      res.json({success:false, msg:'Failed to add rooms'});
    }else{
      res.json({success:true, msg:'Rooms addeds'});
    }
  });

});



//Authenticate
router.post('/authenticate',(req,res,next) => {
  console.log(req);
  const email = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(email, (err, user) =>{
    if(err) throw err;
    if(!user){
        return res.json({success:false, msg:'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) =>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604000//1 week
        });
        res.json({
          success:true,
          token:'JWT '+token,
          user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email: user.email,
            account_ID:user.account_ID
          }
        });
      }else{
        return res.json({success:false, msg:'Wrong Password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next) => {
  res.json([{user: req.user}]);
});

router.get('/fetch_users_byAccountID/:account_id',function(req,res){
		var account_id = req.params.account_id;
	User.getUsersByAccountID(account_id,function(err,callback){
		if(err) return res.json({success:false, msg:'Failed to find users'});
				 res.json(callback);
     });
});

router.get('/fetch_adminUsers/',function(req,res){
User.getAdminUsers(function(err,callback){
  if(err) return res.json({success:false, msg:'Failed to find users'});
       res.json(callback);
   });
});

//delete product
router.delete('/delete_user/:userid',verifyToken,function(req,res){
	var userid = req.params.userid;

	User.DeleteFromUsers(userid,res, function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});

module.exports = router;

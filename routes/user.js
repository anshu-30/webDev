var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')





//=====isloggedin========
function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/"); 
}

router.get("/",function(req,res){
	res.render("ansh");
});


//============auth routes=============

//===signup logic==========
router.post("/register",async(req,res) => {
	  try{
	  	const{username,password} = req.body;
	  	const user = new User({username});
	  	const registeruser = await User.register(user,password);
	  	console.log(registeruser);
	  	
	  	res.redirect("/expense");
	  }
      catch(e){
		  res.redirect("/");
	  }
});
	
	

	
//===login logic==========
router.post("/login",passport.authenticate("local",{
	successRedirect : "/expense",
	failureRedirect : "/"
}),(req,res)=>{
	
});

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

router.use((err,req,res,next)=>{
	console.log('error')
})




module.exports = router
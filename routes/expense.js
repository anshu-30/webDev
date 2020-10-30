const express = require('express')
const router = express.Router()
const passport = require('passport')
const Expense = require('../models/expense')

//=====isloggedin========
function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/"); 
}




router.get("/expense",isloggedin,function(req,res){
	Expense.find({},function(err,expense){
		if(err)console.log(err);
		else{
			const EXPENSE =  expense.filter((u)=>{
			 return u.owner.id.equals(req.user._id)
			 })
			res.render("expense",{user:EXPENSE});
		}
	});
});

router.post("/expense",isloggedin,function(req,res){
	const owner={
	 	id:req.user._id,
	 	username:req.user.username
	 }
	const newUser = {...req.body.user,owner:owner}
	
 	Expense.create(newUser,function(err,expense){
 		if(err)console.log(err);
 		else
 			res.redirect("/expense");		
 	})
	
});

router.get("/users",function(req,res){
	//console.log(req.body);
	Expense.findOneAndDelete(req.params.id,function(err,blog){
		if(err)console.log(err);
		else res.redirect("/expense");
	});
});

router.use((err,req,res,next)=>{
	res.send('something went wrong')
})


module.exports = router
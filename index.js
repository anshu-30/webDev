var express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var passsportLocalMongoose = require('passport-local-mongoose');

var User = require('./models/user')
var expenseRoutes = require('./routes/expense')
var authenticationRoutes = require('./routes/user')

var app = express();
mongoose.connect('mongodb://localhost/yelpcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})	
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


//====Passport configuration=======
app.use(require("express-session")({
		secret: "Rusty wins !!!!",
		resave:false,
		saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=====isloggedin========
function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/"); 
}

app.use(authenticationRoutes)
app.use(expenseRoutes)


app.listen(3000,function(){
	console.log("server is ")
})
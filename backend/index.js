require('dotenv').config();
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var mongoose = require('./Mongo/mongoose')
var cors = require('cors')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var signup = require('./api/routes/common/signup');
var login = require('./api/routes/common/login');
var issuerRouter = require('./api/routes/issuer/issuer');
var userRouter = require('./api/routes/user/user');

app.use(cookieParser())
// saltround = 10;

app.use(cors({ origin: 'http://localhost:4200', credentials: true }))

app.use(
  session({
    secret: 'thisissparta',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000 * 2, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'username', 
	passwordField: 'password', 
	passReqToCallback: true
}, login.loginHandler));
passport.serializeUser(login.serializeUser);
passport.deserializeUser(login.deserializeUser);

app.post('/loggedIn', function(req, res) {
  if (req.user)
    res.send({name: req.user.name, email: req.user.email, type: req.user.type});
  else
    res.status(401).send({message: "Unauthorized"});
});
app.post('/login', passport.authenticate('local'), function(req, res) {
	res.send({name: req.user.name, email: req.user.email, type: req.user.type});
});
app.get('/logout', function(req, res) {
  req.logout();
  res.send({message: "Success"});
});
app.use(signup)
app.use('/issuer',issuerRouter)
app.use('/user',userRouter)
app.listen(3001)
console.log('Server Listening on port 3001')


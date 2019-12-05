var express = require('express');
const bcrypt = require('bcrypt');
var User = require("../../models/user");

function loginHandler(req, username, password, done) {
  console.log(req.body)
  User.findOne({ email: username })
    .exec()
    .then(result => {
      console.log(result);
      if (bcrypt.compareSync(password, result.password)) {
        return done(null, result);
      } else {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    })
    .catch(err => {
      console.log(err);
      return done(null, false, { message: 'DB Error' });
    })
}

function serializeUser(user, done) {
  done(null, user._id);
}

function deserializeUser(id, done) {
  User.findOne({ _id: id })
    .exec()
    .then(result => {
      return done(null, result);
    })
}

function logoutHandler(req, res) {
  // req.logout();
  // res.send({res: "Success"});
}

module.exports = {
  loginHandler: loginHandler,
	logoutHandler: logoutHandler,
	serializeUser: serializeUser,
	deserializeUser: deserializeUser
}
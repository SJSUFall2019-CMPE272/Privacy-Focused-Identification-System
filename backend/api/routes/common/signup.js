var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var User = require("../../models/user");

router.post('/signup', (req, res) => {
  console.log("Inside signup Post Request");
  console.log("Req Body : ", req.body);

  let type = 0;
  if (req.body.type === 'user') {
    type = 1
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const user = new User({
        name: req.body.username,
        password: hash,
        email: req.body.email,
        type: type
      });
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({ success: true });
          res.end("Successful Login");
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ success: false });
          res.end("DB Error");
        })
    });
  });
});

module.exports = router
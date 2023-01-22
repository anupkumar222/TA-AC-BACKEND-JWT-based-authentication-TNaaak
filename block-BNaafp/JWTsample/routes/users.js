var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    var token = await user.signToken();

    res.status(201).json({ user: userJson() })
  } catch(err) {
    return err;
  }
})

//POST user
router.post("/login", async (req, res, next) => {
  var {email, password} = req.body;
  if(!email || !password) {
    return res.status(400).json({ error : "Email/Password is required"})
  }
  try {
    var user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({ error : "Email not Registerd"})
    }
    var result = await User.verifyPassword(password);
    if(!result) {
      return res.status(400).json({ error : "Email not Registerd"});
    }
    var token = await User.signToken();
    res.json({user: user.userJson(token)})
  } catch(error) {
    next(error)
  }
})

module.exports = router;

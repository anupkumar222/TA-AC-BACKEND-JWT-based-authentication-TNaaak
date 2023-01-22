var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await user.create(req.body);
    console.log(user);
    res.status(201).json({ user })
  } catch(err) {
    return err;
  }
})

module.exports = router;

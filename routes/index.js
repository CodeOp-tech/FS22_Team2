var express = require("express");
var router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');

// GET home page
// QUESTION: returns Express index.html, not message below
router.get("/", function (req, res, next) {
  res.send({ message: 'Welcome to the homepage!' });
});


module.exports = router;

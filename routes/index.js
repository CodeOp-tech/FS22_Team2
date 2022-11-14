var express = require("express");
var router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');

// GET home page
// QUESTION: returns Express index.html, not message below
router.get("/", function (req, res, next) {
  console.log("hello jim");
  res.send({ message: 'Welcome to the test homepage!' });
});

// GET members-only
// QUESTION: On Postman, returns "Unauthorized", even after logging in ("POST" login via postman, returns successfully)
router.get('/members-only', ensureUserLoggedIn, function(req, res) {
  res.send({ message: 'Here is your Members Only content from the server...' });
});


module.exports = router;

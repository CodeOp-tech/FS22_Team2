var express = require('express');
var router = express.Router();

// GET one user
// Ensure user can only see their own profile
router.get('/user-id', ensureSameUser, async function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

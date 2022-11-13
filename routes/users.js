var express = require('express');
var router = express.Router();

// GET one user
// Ensure user can only see their own profile
router.get('/userId', ensureSameUser, async function(req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT * FROM users WHERE user-id == ${userId};`

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

module.exports = router;

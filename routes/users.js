var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all users - works!
router.get('/', async function(req, res, next) {
  let sql = 'SELECT * FROM users ORDER BY username';

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach(u => delete u.password);
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// GET one user - works!
// Ensure user can only see their own profile
router.get('/:userId', ensureSameUser, async function(req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT * FROM users WHERE user_id = ${Number(userId)};`

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

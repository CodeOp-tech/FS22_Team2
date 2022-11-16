var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all users - works!
// NOT PROTECTED: get username and points for leaderboard, remove al other info. If we add other info to db, remember to delete later
router.get('/', async function(req, res, next) {
  let sql = 'SELECT * FROM users ORDER BY username';

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach(u => delete u.password);
    users.forEach(u => delete u.email);
    users.forEach(u => delete u.shop_id);
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// GET one user - works!
// PROTECTED: user can only see their own profile
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

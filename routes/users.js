var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all users
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


// GET one user
// PROTECTED: user can only see their own profile
router.get('/:user_id', ensureSameUser, async function(req, res, next) {
  let { user_id } = req.params;
  let sql = `SELECT * FROM users WHERE user_id = ${Number(user_id)};`

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

// PUT add user points from purchase
// PROTECT: ensureSameUser
// is it appropriate to use INNER JOIN here instead of LEFT JOIN? B/c we want to only return users who have purchases
router.get('/points/:user_id', async function(req, res, next) {
  let { user_id } = req.params;
  // access the purchase points via user > purchases > purchased_items 
  // original sqlGet select: SELECT users.*, purchases.user_id, purchases.purchase_id, purchased_items.purchase_id, purchased_items.purchase_points
  let sqlGet = `
    SELECT users.*, purchases.user_id, purchases.purchase_id, purchased_items.purchase_id, purchased_items.purchase_points
      FROM users
      LEFT JOIN purchases ON users.user_id = purchases.user_id 
      LEFT JOIN purchased_items ON purchases.purchase_id = purchased_items.purchase_id
      WHERE users.user_id = ${Number(user_id)}
  `
  // sum all purchase points
  let sqlSum = `SELECT SUM(total) WHERE users.user_id = ${Number(user_id)}
  `
  // add summed purchase_points to user_points
  let sqlPut = `UPDATE users SET users.user_points={}
  WHERE users.user_id = ${Number(user_id)}
  `
  // EXAMPLE PUT
  // if (shop_name) {
  //   await db(
  //     `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shop_id}`
  //   );
  // }

  try {
    let getResults = await db(sqlGet); 
    let getData = getResults.data[0];
    delete getData.password;
    
    let sumResults = await db(`SELECT SUM(${getData.purchase_points})`);
    let sumData = sumResults.data[0];
    
    res.send(getData); 
} catch(err) { 
    res.status(500).send({ error: err.message })
}
});



module.exports = router;

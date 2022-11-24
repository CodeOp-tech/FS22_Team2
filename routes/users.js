var express = require("express");
var router = express.Router();
const { ensureSameUser } = require("../middleware/guards");
const db = require("../model/helper.js");

// GET all users
// NOT PROTECTED: get username and points for leaderboard, remove al other info. If we add other info to db, remember to delete later
router.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password);
    users.forEach((u) => delete u.email);
    users.forEach((u) => delete u.shop_id);
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET one user
// PROTECTED: user can only see their own profile
router.get("/:user_id", ensureSameUser, async function (req, res, next) {
  let { user_id } = req.params;
  let sql = `SELECT * FROM users WHERE user_id = ${Number(user_id)};`;

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT add user points from purchase
router.put("/points/:user_id", async function (req, res, next) {
  let { user_id } = req.params;
  let sqlSum = `
    SELECT SUM(purchased_items.purchase_points) AS purchasePointsSum
      FROM users
      LEFT JOIN purchases ON users.user_id = purchases.user_id 
      LEFT JOIN purchased_items ON purchases.purchase_id = purchased_items.purchase_id
      WHERE users.user_id = ${user_id}
  `;
  // need to figure out how to access value in sumData
  try {
    let sumResults = await db(sqlSum);
    let sumData = sumResults.data[0];
    let sumVal = sumData.purchasePointsSum;

    if (sumVal) {
      await db(
        `UPDATE users SET user_points='${sumVal}' WHERE user_id=${user_id}`
      );
    }

    const results = await db(`SELECT * FROM users WHERE user_id = ${Number(user_id)}`);
    let updatedUser = results.data[0]
    res.send(updatedUser); 
} catch(err) { 
    res.status(500).send({ error: err.message })
}
});

module.exports = router;

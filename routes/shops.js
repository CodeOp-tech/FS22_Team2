var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all shops - works!
router.get('/', async function(req, res, next) {
    let sql = 'SELECT * FROM shops ORDER BY shop_id';
  
    try {
      let results = await db(sql);
      let shops = results.data;
      res.send(shops);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// GET shop by shop_id: for public profile page - works!
router.get('/profile/:shopId', async function(req, res, next) {
    let { shopId } = req.params;
    let sql = `SELECT * FROM shops WHERE shop_id = ${Number(shopId)};`
  
    try {
      let results = await db(sql);
      let shop = results.data[0];
      res.send(shop);
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  });

// GET a user's shop info - protected for editing profile page
router.get('/:userId', ensureSameUser, async function(req, res, next) {
    let { userId } = req.params;
    let sql = `SELECT users.*, shops.*
      FROM users
      LEFT JOIN shops on users.shop_id = shops.shop_id
      WHERE user_id = ${Number(userId)}`
  
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
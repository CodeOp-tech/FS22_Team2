var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all shops - works!
// NOT PROTECTED
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

// GET shop by shop_id - works!
// NOT PROTECTED - for public profile page
router.get('/profile/:shop_id', async function(req, res, next) {
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

// GET a user's shop info - works!
// PROTECTED - for editing profile page
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

// POST create new shop - works!
// PROTECTED - user should only be able to create their own shop
router.post('/new/:userId', ensureSameUser, async function(req, res, next) {
// add new shop (auto-increment, add all other fields, preset points to 0)
let { userId } = req.params;
let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;

let sqlPost = `
  INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
  VALUES ("${shop_name}", "${shop_address}", "${shop_description}", "${shop_image}", "${website}", "${phone}", "${shop_email}", 0);
  SELECT LAST_INSERT_ID()
`
let sqlJoin = `
  SELECT users.*, shops.*
  FROM users
  LEFT JOIN shops on users.shop_id = shops.shop_id
  WHERE user_id = ${Number(userId)}
`

try {
    let postResults = await db(sqlPost);
    console.log(postResults);
    let newShop = postResults.data[0].insertId;
    let putResults = await db(
        `
    UPDATE users SET shop_id=${newShop}
    WHERE user_id = ${Number(userId)}
    `);
    let joinResults = await db(sqlJoin);
    res.send(joinResults.data[0]);
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
});


// PUT edit shop info
// PROTECTED - user should only be able to edit their own shop info
// KIND OF WORKS: if logged in user doesn't match req.params user, returns Forbidden. AND if user tries to edit a different shop, doesn't work. BUT if user tries to edit a different shop, just returns that unchanged shop object. Want it to return Forbidden. Need an ensureShopOwner route or something.
router.put("/edit/:shopId/:userId", ensureSameUser, async (req, res) => { 
    let { shopId, userId }  = req.params;
    let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;
    let sqlUser = `SELECT * FROM users WHERE user_id = ${Number(userId)};`;
    let sqlShop = `SELECT * FROM shops WHERE shop_id = ${Number(shopId)};`;

    try {
        let userResult = await db(sqlUser);
        let user = userResult.data[0];
        delete user.password;
        let shopResult= await db(sqlShop);
        let shop = shopResult.data[0];
      if (user.shop_id === shop.shop_id && shop_name) {
        await db(
          `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shopId}`
        );
      }
  
      if (user.shop_id === shop.shop_id && shop_address) {
        await db(`UPDATE shops SET shop_address='${shop_address}' WHERE shop_id=${shopId}`);
      }
  
      if (user.shop_id === shop.shop_id && shop_description) {
        await db(
          `UPDATE shops SET shop_description='${shop_description}' WHERE shop_id=${shopId}`
        );
      }
  
      if (user.shop_id === shop.shop_id && shop_image) {
        await db(`UPDATE shops SET shop_image='${shop_image}' WHERE shop_id=${shopId}`);
      }

      if (user.shop_id === shop.shop_id && website) {
        await db(`UPDATE shops SET website='${website}' WHERE shop_id=${shopId}`);
      }
  
      if (user.shop_id === shop.shop_id && phone) {
        await db(`UPDATE shops SET phone='${phone}' WHERE shop_id=${shopId}`);
      }

      if (user.shop_id === shop.shop_id && shop_email) {
        await db(`UPDATE shops SET shop_email='${shop_email}' WHERE shop_id=${shopId}`);
      }

      const results = await db(`SELECT * FROM shops WHERE shop_id = ${Number(shopId)}`);
  
      res.status(201).send(results.data); 
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;
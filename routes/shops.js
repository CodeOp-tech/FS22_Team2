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

// GET a user's shop info - protected for editing profile page - works!
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

// POST create new shop
router.post('/new/userId', async function(req, res, next) {
// add new shop (auto-increment, add all other fields, preset points to 0)
let { userId } = req.params;
let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;
let sqlJoin = `
    SELECT users.*, shops.*
    FROM users
    LEFT JOIN shops on users.shop_id = shops.shop_id
    WHERE user_id = ${Number(userId)}
`
let sqlPost = `
    INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
    VALUES (${shop_name}, ${shop_address}, ${shop_description}, ${shop_image}, ${website}, ${phone}, ${shop_email}, 0)
`
// add shop_id to user record
let sqlPut = `
    INSERT INTO users (shop_id)
    VALUES (${LAST_INSERT_ID()})
    WHERE user_id = ${Number(userId)}
`
});


// PUT edit shop info
router.put("/edit/:shopId", async (req, res) => { 
    let shopId  = req.params.shopId;
    let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;

    try {
      if (shop_name) {
        await db(
          `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shopId}`
        );
      }
  
      if (shop_address) {
        await db(`UPDATE shops SET shop_address='${shop_address}' WHERE shop_id=${shopId}`);
      }
  
      if (shop_description) {
        await db(
          `UPDATE shops SET shop_description='${shop_description}' WHERE shop_id=${shopId}`
        );
      }
  
      if (shop_image) {
        await db(`UPDATE shops SET shop_image='${shop_image}' WHERE shop_id=${shopId}`);
      }

      if (website) {
        await db(`UPDATE shops SET website='${website}' WHERE shop_id=${shopId}`);
      }
  
      if (phone) {
        await db(`UPDATE shops SET phone='${phone}' WHERE shop_id=${shopId}`);
      }

      if (shop_email) {
        await db(`UPDATE shops SET shop_email='${shop_email}' WHERE shop_id=${shopId}`);
      }

      const results = await db(`SELECT * FROM shops WHERE shop_id = ${Number(shopId)}`);
  
      res.status(201).send(results.data); //According the MDN Web Docs, PUT request method creates a new resource/replaces a representation of the target resource with the request paylod
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;
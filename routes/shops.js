var express = require('express');
var router = express.Router();
const { ensureSameUser, ensureShopOwner } = require('../middleware/guards');
const db = require('../model/helper.js')

// GET all shops
// NOT PROTECTED - not needed
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

// GET shop by shop_id
// NOT PROTECTED - for public profile page
router.get('/profile/:shop_id', async function(req, res, next) {
    let { shop_id } = req.params;
    let sql = `SELECT * FROM shops WHERE shop_id = ${Number(shop_id)};`
  
    try {
      let results = await db(sql);
      let shop = results.data[0];
      res.send(shop);
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  });

// GET a user's shop info
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

// POST create new shop - NOT USED because post only happens on user registration for now
// // PROTECTED - user should only be able to create their own shop
// router.post('/new/:userId', ensureSameUser, async function(req, res, next) {
// // add new shop (auto-increment, add all other fields, preset points to 0)
// let { userId } = req.params;
// let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;

// let sqlPost = `
//   INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
//   VALUES ("${shop_name}", "${shop_address}", "${shop_description}", "${shop_image}", "${website}", "${phone}", "${shop_email}", 0);
//   SELECT LAST_INSERT_ID()
// `
// let sqlJoin = `
//   SELECT users.*, shops.*
//   FROM users
//   LEFT JOIN shops on users.shop_id = shops.shop_id
//   WHERE user_id = ${Number(userId)}
// `

// try {
//     let postResults = await db(sqlPost);
//     console.log(postResults);
//     let newShop = postResults.data[0].insertId;
//     let putResults = await db(
//         `
//     UPDATE users SET shop_id=${newShop}
//     WHERE user_id = ${Number(userId)}
//     `);
//     let joinResults = await db(sqlJoin);
//     res.send(joinResults.data[0]);
//       } catch (err) {
//         res.status(500).send({ error: err.message })
//       }
// });


// PUT edit shop info - works in Postman!
// PROTECTED - user should only be able to enter own shop
router.put("/edit/:shop_id", ensureShopOwner, async (req, res) => { 
    let { shop_id }  = req.params;
    let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, donate, led_lights, small_biz, min_biz, wo_biz } = req.body;
    let sql = `SELECT * FROM shops WHERE shop_id = ${Number(shop_id)};`;

    try {
        let shopResult= await db(sql);
        let shop = shopResult.data[0];
      if (shop_name) {
        await db(
          `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shop_id}`
        );
      }
  
      if (shop_address) {
        await db(`UPDATE shops SET shop_address='${shop_address}' WHERE shop_id=${shop_id}`);
      }
  
      if (shop_description) {
        await db(
          `UPDATE shops SET shop_description='${shop_description}' WHERE shop_id=${shop_id}`
        );
      }
  
      if (shop_image) {
        await db(`UPDATE shops SET shop_image='${shop_image}' WHERE shop_id=${shop_id}`);
      }

      if (website) {
        await db(`UPDATE shops SET website='${website}' WHERE shop_id=${shop_id}`);
      }
  
      if (phone) {
        await db(`UPDATE shops SET phone='${phone}' WHERE shop_id=${shop_id}`);
      }

      if (shop_email) {
        await db(`UPDATE shops SET shop_email='${shop_email}' WHERE shop_id=${shop_id}`);
      }

      if (donate) {
        await db(`UPDATE shops SET donate='${Number(donate)}' WHERE shop_id=${shop_id}`);
      }

      if (led_lights) {
        await db(`UPDATE shops SET led_lights='${Number(led_lights)}' WHERE shop_id=${shop_id}`);
      }

      if (small_biz) {
        await db(`UPDATE shops SET small_biz='${Number(small_biz)}' WHERE shop_id=${shop_id}`);
      }

      if (min_biz) {
        await db(`UPDATE shops SET min_biz='${Number(min_biz)}' WHERE shop_id=${shop_id}`);
      }

      if (wo_biz) {
        await db(`UPDATE shops SET wo_biz='${Number(wo_biz)}' WHERE shop_id=${shop_id}`);
      }

      const results = await db(`SELECT * FROM shops WHERE shop_id = ${Number(shop_id)}`);
  
      res.status(201).send(results.data); 
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;

// ORIGINAL PUT ROUTE
// PUT edit shop info
// PROTECTED - user should only be able to enter own shop
// router.put("/edit/:shopId/:userId", ensureShopOwner, async (req, res) => { 
//   let { shopId, userId }  = req.params;
//   let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, donate, led_lights, small_biz, min_biz, wo_biz } = req.body;
//   let sqlUser = `SELECT * FROM users WHERE user_id = ${Number(userId)};`;
//   let sqlShop = `SELECT * FROM shops WHERE shop_id = ${Number(shopId)};`;

//   try {
//       let userResult = await db(sqlUser);
//       let user = userResult.data[0];
//       delete user.password;
//       let shopResult= await db(sqlShop);
//       let shop = shopResult.data[0];
//     // if !user.shop_id =
//     if (user.shop_id === shop.shop_id && shop_name) {
//       await db(
//         `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shopId}`
//       );
//     }

//     if (user.shop_id === shop.shop_id && shop_address) {
//       await db(`UPDATE shops SET shop_address='${shop_address}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && shop_description) {
//       await db(
//         `UPDATE shops SET shop_description='${shop_description}' WHERE shop_id=${shopId}`
//       );
//     }

//     if (user.shop_id === shop.shop_id && shop_image) {
//       await db(`UPDATE shops SET shop_image='${shop_image}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && website) {
//       await db(`UPDATE shops SET website='${website}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && phone) {
//       await db(`UPDATE shops SET phone='${phone}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && shop_email) {
//       await db(`UPDATE shops SET shop_email='${shop_email}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && donate) {
//       await db(`UPDATE shops SET donate='${Number(donate)}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && led_lights) {
//       await db(`UPDATE shops SET led_lights='${Number(led_lights)}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && small_biz) {
//       await db(`UPDATE shops SET small_biz='${Number(small_biz)}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && min_biz) {
//       await db(`UPDATE shops SET min_biz='${Number(min_biz)}' WHERE shop_id=${shopId}`);
//     }

//     if (user.shop_id === shop.shop_id && wo_biz) {
//       await db(`UPDATE shops SET wo_biz='${Number(wo_biz)}' WHERE shop_id=${shopId}`);
//     }

//     const results = await db(`SELECT * FROM shops WHERE shop_id = ${Number(shopId)}`);

//     res.status(201).send(results.data); 
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });
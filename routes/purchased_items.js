var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/*****Join to JSON Helper function*****/
function joinToJson(results) {
    // Create array of shops/purchases/products/users object
    let combo = results.data.map((row) => ({
        date: row.purchase_date,
        shopName: row.shop_name,
        productName: row.product_name,
        price: row.price,
        points: row.purchase_points, 
        userId: row.user_id,
        shopId: row.shop_id,
    }));
    // Create purchased_items from first row
    // Get first row
    let row0 = results.data[0];
    let purchaseditems = {
        id: row0.purchased_items_id,
        quantity: row0.purchase_quantity,
        purchaseId: row0.purchase_id,
        productId: row0.product_id,
        combo 
    };
    return purchaseditems;
}

// GET ALL PURCHASED_ITEMS REGARDLESS OF USERS / SHOPS
router.get('/', async function(req, res,) { 

    try {
      let results = await db(`SELECT * FROM purchased_items`); 
      let purchased_items = results.data;  
      res.send(purchased_items);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

// GET PURCHASED_ITEMS BASED OFF USER ID (USER PURCHASE HISTORY)
  router.get('/:user_id', async function(req, res,) { // NOTE: front-end fetch must pass user_id (can be stored in Local.js?)
// which is passed from front end fetch at...
    let id = req.params.user_id;

    // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
    try {
      let results = await db(
        `SELECT purchased_items.*, purchases.purchase_date, shops.shop_name, products.product_name, products.price, purchases.purchase_points, purchases.user_id 
        FROM purchased_items
        LEFT JOIN purchases ON purchased_items.purchase_id = purchases.purchase_id 
        LEFT JOIN products ON purchased_items.product_id = products.product_id
        LEFT JOIN shops ON purchased_items.shop_id = shops.shop_id
      WHERE user_id = ${Number(id)}
      ORDER BY purchase_date`); 
      let purchased_items = joinToJson(results);  
      res.send(purchased_items);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

  // GET PURCHASED_ITEMS BASED OFF STORE ID (STORE PURCHASE HISTORY)
  router.get('/:shop_id', async function(req, res,) { // NOTE: front-end fetch must pass shop_id (can be stored in Local.js?)
    // which is passed from front end fetch at...
        let id = req.params.shop_id;
    
        // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
        try {
          let results = await db(
            `SELECT purchased_items.*, purchase_date, shop_name, product_name, price, purchase_quantity, purchase_points, user_id 
            FROM purchased_items
            LEFT JOIN purchases ON purchased_items.purchase_id = purchases.purchase_id 
            LEFT JOIN products ON purchased_items.product_id = products.product_id
            LEFT JOIN shops ON purchased_items.shop_id = shops.shop_id
          WHERE shop_id = ${Number(id)}
          ORDER BY purchase_date`); 
          let purchased_items = joinToJson(results); 
          res.send(purchased_items);
      } catch (err) {
          res.status(500).send({ error: err.message });
      }
      });

  // ADD PURCHASE TO GENERAL PURCHASE DATABASE BUT RETURN ONLY PURCHASES ASSOCIATED WITH USER
  router.post("/:user_id", async (req, res) => { // NOTE: front-end fetch must pass purchase_id, product_id and shop_id through req.body below
    let id = req.params.user_id;

    let { purchase_quantity, purchase_id, product_id, shop_id } = req.body;
  
    let sql = `
        INSERT INTO purchased_items (purchase_quantity, purchase_id, product_id, shop_id)
        VALUES ('${Number(purchase_quantity)}', '${Number(purchase_id)}', '${Number(product_id)}', ${Number(shop_id)})
    `;
  
    try {
        await db(sql);  
        let result = await db(`SELECT * FROM purchases WHERE user_id = ${Number(id)}`); // user_id taken from req.params
        let purchased_items = result.data;
        res.status(201).send(purchased_items); // 201 status because indicates request has succeeded and lead to creation of resource
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;
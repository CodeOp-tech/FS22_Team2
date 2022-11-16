var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUser } = require('../middleware/guards');

// GET ALL PRODUCTS REGARDLESS OF STORE
router.get('/', async function(req, res,) { 

    try {
      let results = await db(`SELECT * FROM products`); 
      let products = results.data;  
      res.send(products);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

// GET PRODUCTS BASED OFF STORE ID
// NOTE: Doesn't need protection b/c just to display products; can't edit
  router.get('/:shop_id', async function(req, res,) { // NOTE: front-end fetch must pass shop_id (can be stored in Local.js?)
// which is passed from front end fetch at...
    let id = req.params.shop_id;

    // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
    try {
      let results = await db(`SELECT * FROM products WHERE shop_id = ${Number(id)}`); 
      let products = results.data;  
      res.send(products);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

  // ADD PRODUCT BASED OFF STORE ID
  router.post("/:userId", async (req, res) => { // NOTE: front-end fetch must pass shop_id through req.body below
    let { product_name, price, product_image, product_quantity, product_description, shop_id } = req.body;
  
    let sql = `
        INSERT INTO products (product_name, price, product_image, product_quantity, product_description, shop_id)
        VALUES ('${product_name}', '${price}', '${product_image}', '${product_quantity}', '${product_description}', ${Number(shop_id)})
    `;
  
    try {
        await db(sql);  
        let result = await db(`SELECT * FROM products WHERE shop_id = ${Number(shop_id)}`); // shop_id taken from req.body
        let products = result.data;
        res.status(201).send(products); // 201 status because indicates request has succeeded and lead to creation of resource
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  // EDIT PRODUCT BASED OFF PRODUCT ID (shop_id passed in req.body)
  // NOTE: Protected b/c need to make sure shop owner is the only one who can edit products
  // QUESTION: Is this enough? Do we need to do any kind of check to make sure user is also shop owner?
  router.put("/:product_id/user_id", async (req, res) => { // NOTE: front-end fetch must pass product_id (can be stored in Local.js?)
    let id  = req.params.product_id;
    let { product_name, price, product_image, product_quantity, product_description, shop_id } = req.body;
   
    try {
      if (product_name) {
        await db(
          `UPDATE products SET product_name='${product_name}' WHERE product_id=${id}` // id = product_id
        );
      }
  
      if (price) {
        await db(`UPDATE products SET price='${price}' WHERE product_id=${id}`);
      }
  
      if (product_image) {
        await db(
          `UPDATE products SET product_image='${product_image}' WHERE product_id=${id}`
        );
      }
  
      if (product_quantity) {
        await db(`UPDATE products SET product_quantity='${product_quantity}' WHERE product_id=${id}`);
      }

      if (product_description) {
        await db(`UPDATE products SET product_description='${product_description}' WHERE product_id=${id}`);
      }
  
      const results = await db(`SELECT * FROM products WHERE shop_id = ${Number(shop_id)}`); // shop_id taken from req.body
  
      res.status(201).send(results.data); //According the MDN Web Docs, PUT request method creates a new resource/replaces a representation fo the target resource with the request paylod
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // DELETE PRODUCT BASED OFF PRODUCT ID
  router.delete("/:product_id/:shop_id", async (req, res) => { // NOTE: front-end fetch must pass product_id and shop_id (can be stored in Local.js?)
    let id = req.params.product_id;
    let shop_id = req.params.shop_id; // need shop_id to display only products in said shop, once delete is executed

    // Reference to ...
    try {
        let result = await db(`SELECT * FROM products WHERE product_id = ${Number(id)}`); // WHERE id refers to the product_id
        if (result.data.length === 0) {
            res.status(404).send({ error: 'Data not found' });
        } else {
            await db(`DELETE FROM products WHERE product_id = ${Number(id)}`);  
            let result = await db(`SELECT * FROM products WHERE shop_id = ${Number(shop_id)}`); // display only items in said shop
            let products = result.data;
            res.send(products);  
        } 
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;
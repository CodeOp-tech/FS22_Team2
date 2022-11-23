var express = require('express');
var router = express.Router();
const path = require('path');
const db = require("../model/helper");
const { ensureSameUser, ensureShopOwner } = require('../middleware/guards');
const multer = require('multer')
const fs = require('fs/promises');

const PUBLIC_DIR_URL = 'http://localhost:5000/productImg';

 const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/productImg');  // store files here
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);  // keep original filename
  }
});
const upload = multer({ storage });


async function sendAllFiles(res) {
  try {
      let results = await db(`SELECT products.*, shops.shop_name
      FROM products
      LEFT JOIN shops on products.shop_id = shops.shop_id`);
      // Add 'url' property for each file
      let withUrls = results.data.map(r => ({...r, url: `${PUBLIC_DIR_URL}/${r.product_image}`}));
      res.send(withUrls);

  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}


 //TEST POST
 //router.post("/:shop_id", async (req, res) => {
  // let { product_name, product_image, price, product_description, product_quantity, recycled, no_fridge, fair_trade, local, organic } = req.body; 
  // console.log("here", req.body);
  // let shop_id = req.params.shop_id;
  // let sql = `
  //       INSERT INTO products (product_name,  price, product_description, product_quantity, recycled, no_fridge, fair_trade, local, organic)
  //       VALUES ('${product_name}', '${price}', '${product_description}', '${product_quantity}', '${recycled}', '${no_fridge}', '${fair_trade}', '${local}', '${organic}' ${Number(shop_id)})
  //   `;
  
  //   try {
  //       await db(sql);  
  //       let result = await db(`SELECT * FROM products WHERE shop_id = ${Number(shop_id)}`); // shop_id taken from req.body
  //       let products = result.data;
  //       res.status(201).send(products); // 201 status because indicates request has succeeded and lead to creation of resource
  //   } catch (err) {
  //       res.status(500).send({ error: err.message });
  //   }
  //});

// GET ALL PRODUCTS REGARDLESS OF STORE
router.get('/', async function(req, res,) { 

    try {
      // let results = await db(`SELECT * FROM products`); 
      // let products = results.data;  
      // res.send(products);
      sendAllFiles(res)

  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

// GET PRODUCTS BASED OFF SHOP ID - works in Postman
// NOT PROTECTED: Doesn't need b/c just to display products; can't edit
  router.get('/:shop_id', async function(req, res,) { // NOTE: front-end fetch must pass shop_id (can be stored in Local.js?)
// which is passed from front end fetch at...
    let shop_id = req.params.shop_id; // changed variable from "id" to "shop_id"

    // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
    // tried passing shop_id directly instead of as number, also didn't work
    try {
      let results = await db(`SELECT * FROM products WHERE shop_id = ${Number(shop_id)}`); 
      let products = results.data;  
      let withUrls = products.map(r => ({...r, url: `${PUBLIC_DIR_URL}/${r.product_image}`})); //Get has to change for the images to show  from the databases 
      res.send(withUrls);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });


  // ADD PRODUCT BASED OFF STORE ID
  // PROTECTED: user should only be able to edit their own shop info
  // URGENT NOTE: Need to pass shop_id so we can protect
  router.post("/:shop_id", upload.single ('productimg'), async (req, res) => { // NOTE: front-end fetch must pass shop_id through req.body below 
    let { shop_id } = req.params;
    let { product_name, price, product_image, product_quantity, product_description, recycled, no_fridge, fair_trade, local, organic} = req.body;

    try{


    let sql = `
        INSERT INTO products (product_name, price, product_image, product_quantity, product_description, shop_id, recycled, no_fridge, fair_trade, local, organic )
        VALUES ('${product_name}', ${Number(price)}, '${req.file.originalname}', ${Number(product_quantity)}, '${product_description}', ${shop_id}, ${recycled}, ${no_fridge}, ${fair_trade}, ${local}, ${organic} )
    ;`
    
        await db(sql);  
        let result = await db(`SELECT * FROM products WHERE shop_id = ${shop_id}`); // shop_id taken from req.params
        // let products = result.data;
        res.status(201) //.send(products); 
        sendAllFiles(res)// 201 status because indicates request has succeeded and lead to creation of resource
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });


  // EDIT PRODUCT BASED OFF PRODUCT ID (shop_id passed in req.body)
  // PROTECT: ensureShopOwner
  // QUESTION: Is this enough? Do we need to do any kind of check to make sure user is also shop owner?

  //router.put("/:product_id", upload.single ('productimg'), async (req, res) => { // NOTE: front-end fetch must pass product_id (can be stored in Local.js?)

  router.put("/:product_id", upload.single ('productimg'), async (req, res) => { // NOTE: front-end fetch must pass shop_id through body

    let id  = req.params.product_id;
    console.log('**********find me**********', id, req.body)
    let { product_name, price, product_quantity, product_description, shop_id, recycled, no_fridge, fair_trade, local, organic } = req.body;
    console.log('**********find me again**********', id, req.body)

    try {
    
      if (product_name) {
        await db(
          `UPDATE products SET product_name='${product_name}' WHERE product_id=${id}` // id = product_id
        );
      }
  
      if (price) {
        await db(`UPDATE products SET price='${price}' WHERE product_id=${id}`);
      }
  
      // if (product_image) {
      //   await db(
      //     `UPDATE products SET product_image='${req.file.originalname}' WHERE product_id=${Number(id)}`
      //   );
      // }
  
      if (product_quantity) {
        await db(`UPDATE products SET product_quantity='${product_quantity}' WHERE product_id=${id}`);
      }

      if (product_description) {
        await db(`UPDATE products SET product_description='${product_description}' WHERE product_id=${id}`);
      }

      if (recycled) {
        await db(`UPDATE products SET product_description='${recycled}' WHERE product_id=${id}`);
      }

      if (no_fridge) {
        await db(`UPDATE products SET product_description='${no_fridge}' WHERE product_id=${id}`);
      }

      if (fair_trade) {
        await db(`UPDATE products SET product_description='${fair_trade}' WHERE product_id=${id}`);
      }

      if (local) {
        await db(`UPDATE products SET product_description='${local}' WHERE product_id=${id}`);
      }

      if (organic) {
        await db(`UPDATE products SET product_description='${organic}' WHERE product_id=${id}`);
      }
      
      const results = await db(`SELECT * FROM products WHERE shop_id = ${shop_id}`)
      let withUrls = results.data.map(r => ({...r, url: `${PUBLIC_DIR_URL}/${r.product_image}`}));
      
      res.send(withUrls);
      //According the MDN Web Docs, PUT request method creates a new resource/replaces a representation fo the target resource with the request paylod
    } catch (err) {

      res.status(500).send({ error: err.message });
    }
  });

  // DELETE PRODUCT BASED OFF PRODUCT ID
  // PROTECT: ensureShopOwner
  router.delete("/:shop_id/:product_id", async (req, res) => { // NOTE: front-end fetch must pass product_id and shop_id (can be stored in Local.js?) //ADDED THE SHOP ID
    let id = req.params.product_id;
    let shopid = req.params.shop_id;
  
    try {
        let result = await db(`SELECT * FROM products WHERE product_id = ${id}`); // WHERE id refers to the product_id
        if (result.data.length === 0) {
            res.status(404).send({ error: 'Data not found' });
        } else {
            await db(`DELETE FROM products WHERE product_id = ${id}`);  

            let results = await db(`SELECT * FROM products WHERE shop_id = ${Number(shopid)}`); 
            let products = results.data;  
            let withUrls = products.map(r => ({...r, url: `${PUBLIC_DIR_URL}/${r.product_image}`})); //Get has to change for the images to show  from the databases 
            res.send(withUrls); // need lines 200 - 204 to execute delete without all products showing (sending only products for that specific shop)

            //  sendAllFiles(res)
            // let result = await db('SELECT * FROM products');
            // let products = result.data;
            // res.send(products);  
        } 
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;
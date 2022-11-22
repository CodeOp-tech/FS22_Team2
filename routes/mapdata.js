// var express = require("express");
// var router = express.Router();
// const db = require("../model/helper");
// //get ALL shops!
// //need help to edit this.
// router.get("/", async function (req, res, next) {
//   // let id = req.params.shop_id;
//   db("SELECT * FROM shops;")
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

// // GET SHOP LONG AND LAT BASED OFF PRODUCTS (STORE PURCHASE HISTORY)
// router.get("/shops/:shop_id", async function (req, res) {
//   // NOTE: front-end fetch must pass shop_id (can be stored in Local.js?)
//   // which is passed from front end fetch at...
//   let id = req.params.shop_id;

//   // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
//   try {
//     let results = await db(
//       `SELECT shops.* , products.product_name
//       FROM shops
//             LEFT JOIN products ON shops.shop_id = products.shop_id

//     );
//     let purchased_items = results.data;
//     res.send(purchased_items);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

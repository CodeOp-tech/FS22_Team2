var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUser, ensureShopOwner } = require('../middleware/guards');

// GET ALL PURCHASES REGARDLESS OF USERS
router.get('/', async function(req, res) { 

    try {
      let results = await db(`SELECT * FROM purchases`); 
      let purchases = results.data;  
      res.send(purchases);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

// GET PURCHASES BASED OFF USER ID
// NOTE FROM JESS: This route built, but not called (not necessary, we only call purchaseditems table)
  router.get('/:user_id', ensureSameUser, async function(req, res,) { 
    let id = req.params.user_id;
    try {
      let results = await db(`SELECT * FROM purchases WHERE user_id = ${Number(id)}`); 
      let purchases = results.data;  
      res.send(purchases);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

  // ADD PURCHASE TO GENERAL PURCHASE DATABASE BUT RETURN ONLY PURCHASES ASSOCIATED WITH USER
  router.post("/", async (req, res) => { // NOTE: front-end fetch must pass user_id through req.body below
    let { purchase_sum, user_id } = req.body;
    // which is called from front-end fetch at App, through addPurchases
  
    let sql = `
        INSERT INTO purchases ( purchase_sum, user_id)
        VALUES ( ${Number(purchase_sum)}, ${Number(user_id)})
    `;
  
    try {
        await db(sql);  
        let results = await db(`SELECT * FROM purchases WHERE user_id = ${Number(user_id)}`); // user_id taken from req.body
        let purchases = results.data;
        res.status(201).send(purchases); // 201 status because indicates request has succeeded and lead to creation of resource
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;
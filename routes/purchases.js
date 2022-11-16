var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// GET ALL PURCHASES REGARDLESS OF USERS
router.get('/', async function(req, res,) { 

    try {
      let results = await db(`SELECT * FROM purchases`); 
      let purchases = results.data;  
      res.send(purchases);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
  });

// GET PURCHASES BASED OFF USER ID
  router.get('/:user_id', async function(req, res,) { // NOTE: front-end fetch must pass user_id (can be stored in Local.js?)
// which is passed from front end fetch at...
    let id = req.params.user_id;

    // NOTE: get method doesn't have a body, so id must be passed in link (req.params)
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
    let { purchase_sum, purchase_points, user_id } = req.body;
  
    let sql = `
        INSERT INTO purchases ( purchase_sum, purchase_points, user_id)
        VALUES ( ${purchase_sum}, ${purchase_points}, ${Number(user_id)})
    `;
  
    try {
        await db(sql);  
        let result = await db(`SELECT * FROM purchases WHERE user_id = ${Number(user_id)}`); // user_id taken from req.body
        let purchases = result.data;
        res.status(201).send(purchases); // 201 status because indicates request has succeeded and lead to creation of resource
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

  module.exports = router;
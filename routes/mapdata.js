var express = require("express");
var router = express.Router();
const db = require("../model/helper");
//get ALL shops!
//need help to edit this.
router.get("/", async function (req, res, next) {
  // let id = req.params.shop_id;
  db("SELECT * FROM shops;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

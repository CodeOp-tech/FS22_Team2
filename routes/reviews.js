var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET ALL USER REVIEWS
router.get('/', async function (req, res) {

    try {
        let results = await db(`SELECT * FROM reviews`);
        let reviews = results.data;
        res.send(reviews);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// GET PRODUCT REVIEWS
router.get('/:product_id', async function(req, res) {
    let id = req.params.product_id

    try {
        let results = await db(`SELECT reviews.*, users.username
        FROM reviews
        LEFT JOIN users on reviews.user_id = users.user_id
        WHERE product_id = ${Number(id)}
        ORDER BY review_date DESC`);
        let reviews = results.data;
        res.send(reviews);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// ADD REVIEW TO REVIEWS DATABASE
router.post('/', async function(req, res) {
    // let id = req.params.product_id
    let { newReview: {stars, review_title, review_body}, product_id, user_id } = req.body;
    // destructuring newReview object above

    let sql= `
        INSERT INTO reviews (stars, review_title, review_body, product_id, user_id)
        VALUES (${Number(stars)}, '${review_title}', '${review_body}', ${Number(product_id)}, ${Number(user_id)})
    `;

    try {
        await db(sql);
        let results = await db(`SELECT * FROM reviews WHERE product_id = ${Number(product_id)} ORDER BY review_date DESC`); // product_id taken from req.body
        let reviews = results.data;
        res.status(201).send(reviews);
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

module.exports = router;
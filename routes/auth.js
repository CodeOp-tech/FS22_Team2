const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config.js');
const db = require("../model/helper.js");

// Register new user (and shop)
// NOTE: removed has_shop to test; add back in later
router.post ('/register', async (req,res) => {
    // has_shop in req.body should be a boolean (needs to come from front end?)
    let { username, password, email, has_shop } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        // add new user to db w/input info
        let sqlPostUser = `
            INSERT INTO users (username, password, email, user_points)
            VALUES ('${username}', '${hashedPassword}', '${email}', 0);
            SELECT LAST_INSERT_ID()
        `;
        
        // add new shop to db w/fields preset to null
        let sqlPostShop = `
            INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, donate, led_lights, small_biz, min_biz, wo_biz, latitude, longitude)
            VALUES ('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0.0, 0.0);
            SELECT LAST_INSERT_ID()
        `
        // POST new user
        let userResults = await db(sqlPostUser);
        // save user_id for later
        let user_id = userResults.data[0].insertId;

        // if user opts to add a shop
        if (has_shop) {
            // POST new shop
            let shopResults = await db(sqlPostShop);
            // save shop_id
            let shop_id = shopResults.data[0].insertId;
            // add shop_id to user's record
            await db(`
                UPDATE users SET shop_id=${shop_id}
                WHERE user_id = ${Number(user_id)}
            `);
        }

        res.send({message: 'Registration succeeded'});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});  


// Log in user
router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        let userResults = await db(`SELECT * FROM users WHERE username = '${username}'`); // look for username
        if (userResults.data.length === 0) {
            res.status(401).send({ error: 'Login failed'}); // if username not found, throw error
        } else { // else user exists, so save user info & check if passwords match
            let user = userResults.data[0]; // save user info as object
            let shop = null; // make shop accessible outside if statement
            if (user.shop_id) { // if user has a shop 
                let shopResults = await db(`SELECT * FROM shops WHERE shop_id = '${user.shop_id}'`);
                shop = shopResults.data[0];
            } // return and save user's shop as an object
            let passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) { // if ok, add user info to token payload
                let payload = { userId : user.user_id, shopId : user.shop_id };
                let token = jwt.sign(payload, SECRET_KEY);
                delete user.password; // remove the password so it doesn't get returned
                res.send({ // send the user's info to the client
                    message: 'Login succeeded',
                    token: token,
                    user: user,
                    shop: shop
                });
            } else { // if it didn't work, throw error
                res.status(401).send({ error: 'Login failed' }); 
            }
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
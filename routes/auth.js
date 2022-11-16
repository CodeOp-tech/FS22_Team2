const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config.js');
const db = require("../model/helper.js");

// Register new user - works! 
router.post ('/register', async (req,res) => {
    // add has_shop to req.body
    let { username, password, email, has_shop } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    let shop_id = null;
    
    try {
        // add user
        // QUESTION: do we need to add has_shop to db?
        let userPostResults = await db(`
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}');
        `);
        console.log(userPostResults);

        // save user_id for later
        // SELECT LAST_INSERT_ID()
        // let user_id = userPostResults.data[0].insertId;

        // if user selects has_shop, post empty shop object
        // somewhere in here, also need to redirect to shop edit page
        // if (has_shop) {
        //     let shopPostResults = await db(`
        //         INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points);
        //         SELECT LAST_INSERT_ID()
        //     `);

        //     // save new shop_id and add it to new user
        //     shop_id = shopPostResults.data[0].insertId;
        //     let putResults = await db(`
        //         UPDATE users SET shop_id=${shop_id}
        //         WHERE user_id = ${Number(user_id)}
        //     `);
        // } 
        res.send({userPostResults});
        // message: 'Registration succeeded'
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});  

// Log in user - works!
router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        // look for username
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`);
        // if username not found, throw error
        if (results.data.length === 0) {
            res.status(401).send({ error: 'Login failed'});
        // else if user does exist, save user info & check if passwords match
        } else {
            let user = results.data[0];
            let passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
                // add shop_id to token (with comma)
                let payload = { userId : user.user_id, shopId : user.shop_id };
                let token = jwt.sign(payload, SECRET_KEY);
                delete user.password;
                res.send({
                    message: 'Login succeeded',
                    token: token,
                    user: user
                });
            console.log(payload)
            } else {
                res.status(401).send({ error: 'Login failed' }); 
            }
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
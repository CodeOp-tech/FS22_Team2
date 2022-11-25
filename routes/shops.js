var express = require("express");
var router = express.Router();
const { ensureSameUser, ensureShopOwner } = require("../middleware/guards");
const db = require("../model/helper.js");

router.get("/", async function (req, res, next) {
  let sql = `SELECT * FROM shops`;
  try {
    let results = await db(sql);
    let shops = results.data;
    res.send(shops);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//helper
function makeWhereFromFilters(query) {
  let filters = [];
  let words = query.product_name.split(",").map((w) => `"${w}"`);
  filters.push(words);
  return " IN (" + filters.join(", ") + ")";
}

router.get("/search/products", async function (req, res, next) {
  let sql = `SELECT DISTINCT shops.*, products.*
  FROM shops LEFT JOIN products ON shops.shop_id = products.shop_id`;
  let where = makeWhereFromFilters(req.query);
  // If query parameters were passed, append them to the SELECT statement
  if (where) {
    sql += ` WHERE products.product_name ${where}`;
  }
  try {
    let results = await db(sql);
    let shops = results.data;
    res.send(shops);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET shop by shop_id
// NOT PROTECTED - for public profile page
router.get("/profile/:shop_id", async function (req, res, next) {
  let { shop_id } = req.params;
  let sql = `SELECT * FROM shops WHERE shop_id = ${Number(shop_id)};`;

  try {
    let results = await db(sql);
    let shop = results.data[0];
    res.send(shop);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET a user's shop info
// PROTECTED - for editing profile page
router.get("/:user_id", ensureSameUser, async function (req, res, next) {
  let { user_id } = req.params;
  let sql = `SELECT users.*, shops.*
      FROM users
      LEFT JOIN shops on users.shop_id = shops.shop_id
      WHERE user_id = ${Number(user_id)}`;

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST create new shop - NOT USED because post only happens on user registration for now
// // PROTECTED - user should only be able to create their own shop
// router.post('/new/:userId', ensureSameUser, async function(req, res, next) {
// // add new shop (auto-increment, add all other fields, preset points to 0)
// let { userId } = req.params;
// let { shop_name, shop_address, shop_description, shop_image, website, phone, shop_email } = req.body;

// let sqlPost = `
//   INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
//   VALUES ("${shop_name}", "${shop_address}", "${shop_description}", "${shop_image}", "${website}", "${phone}", "${shop_email}", 0);
//   SELECT LAST_INSERT_ID()
// `
// let sqlJoin = `
//   SELECT users.*, shops.*
//   FROM users
//   LEFT JOIN shops on users.shop_id = shops.shop_id
//   WHERE user_id = ${Number(userId)}
// `

// try {
//     let postResults = await db(sqlPost);
//     console.log(postResults);
//     let newShop = postResults.data[0].insertId;
//     let putResults = await db(
//         `
//     UPDATE users SET shop_id=${newShop}
//     WHERE user_id = ${Number(userId)}
//     `);
//     let joinResults = await db(sqlJoin);
//     res.send(joinResults.data[0]);
//       } catch (err) {
//         res.status(500).send({ error: err.message })
//       }
// });

// PUT edit shop info
// PROTECTED - user should only be able to enter own shop
router.put("/edit/:shop_id", ensureShopOwner, async (req, res) => {
  let { shop_id } = req.params;
  let {
    shopData: {
      shop_name,
      shop_description,
      shop_image,
      shop_address,
      website,
      phone,
      shop_email,
      donate,
      led_lights,
      small_biz,
      min_biz,
      wo_biz,
    },
  } = req.body;
  // let sql = `SELECT * FROM shops WHERE shop_id = ${Number(shop_id)};`;

  try {
    // let shopResult= await db(sql);
    // let shop = shopResult.data[0];
    if (shop_name) {
      await db(
        `UPDATE shops SET shop_name='${shop_name}' WHERE shop_id=${shop_id}`
      );
    }

    if (shop_address) {
      await db(
        `UPDATE shops SET shop_address='${shop_address}' WHERE shop_id=${shop_id}`
      );
    }

    if (shop_description) {
      await db(
        `UPDATE shops SET shop_description='${shop_description}' WHERE shop_id=${shop_id}`
      );
    }

    if (shop_image) {
      await db(
        `UPDATE shops SET shop_image='${shop_image}' WHERE shop_id=${shop_id}`
      );
    }

    if (website) {
      await db(
        `UPDATE shops SET website='${website}' WHERE shop_id=${shop_id}`
      );
    }

    if (phone) {
      await db(`UPDATE shops SET phone='${phone}' WHERE shop_id=${shop_id}`);
    }

    if (shop_email) {
      await db(
        `UPDATE shops SET shop_email='${shop_email}' WHERE shop_id=${shop_id}`
      );
    }

    if (donate) {
      await db(
        `UPDATE shops SET donate='${Number(donate)}' WHERE shop_id=${shop_id}`
      );
    }

    if (led_lights) {
      await db(
        `UPDATE shops SET led_lights='${Number(
          led_lights
        )}' WHERE shop_id=${shop_id}`
      );
    }

    if (small_biz) {
      await db(
        `UPDATE shops SET small_biz='${Number(
          small_biz
        )}' WHERE shop_id=${shop_id}`
      );
    }

    if (min_biz) {
      await db(
        `UPDATE shops SET min_biz='${Number(min_biz)}' WHERE shop_id=${shop_id}`
      );
    }

    if (wo_biz) {
      await db(
        `UPDATE shops SET wo_biz='${Number(wo_biz)}' WHERE shop_id=${shop_id}`
      );
    }

    const results = await db(
      `SELECT * FROM shops WHERE shop_id = ${Number(shop_id)}`
    );
    let updatedShop = results.data[0];
    res.status(201).send(updatedShop);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

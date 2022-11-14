var express = require('express');
const stripe = require('stripe');
var router = express.Router();

router.post('/checkout', async function(req, res,) { 
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */

    const items = req.body.items;
    let lineItems = []; // what Stripe calls items for API call
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    // Server will wait for Stripe to fully create checkout session due to await
    const session = await stripe.checkout.sessions.create({ // create properties below
        line_items: lineItems, 
        mode: "payment", 
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    })

    // now have access to URL for user to checkout
    res.send(JSON.stringify({
        url: session.url // allows us to show user session created for them
    }));

  });


module.exports = router;
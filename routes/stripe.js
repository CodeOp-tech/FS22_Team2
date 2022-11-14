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

    console.log(req.body);
    
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
        success_url: "http://localhost:3000/success", // if checkout is successful
        cancel_url: "http://localhost:3000/cancel" // if checkout fails
    })

    // now have access to URL for user to checkout
    res.send(JSON.stringify({ // send object to front end, with one property
        url: session.url // allows us to show user session that Stripe created for them
    }));

  });


module.exports = router;
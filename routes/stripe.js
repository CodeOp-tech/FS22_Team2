// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

var express = require('express');
const stripe = require('stripe')('sk_test_51M44XcBIwndE5957JT6M9Ci3tHIx8cPZPBSqjFCjlBx2gXxkLcIu9LrPwy74M2qaRIHTXHIw0JC7EFQSCeT4ALpE00uXfmJS60');
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

    const items = req.body.items; // take the items passed from front-end, NavbarShop
    let lineItems = []; // what Stripe calls items for API call
    items.forEach((item) => { // take the items and make them into a format that Stripe understands
        lineItems.push(
            {
                price: item.stripe_id, // Stripe wants the id it provides, sent over in a price field
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

//   app.listen(5000, () => console.log("Listening on port 5000")) // demo is 4000

module.exports = router;
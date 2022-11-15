// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia

import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import CartContext from "../CartContext";
import CartProductModal from "./CartProductModal";
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart

function NavbarShop() {
    // NOTE: cartProducts passed down by CartContext. Only cartProducts needed in this context
    // cartProducts state (see App) has five properties: id, quantity, name, price and stripe_id
    const { cartProducts, getTotalCostCb } = useContext(CartContext);

    const [show, setShow] = useState(false); // initially not show modal
    
    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

     // POST to checkout
     const checkout = async() => {
        await fetch("http://localhost:5000/checkout", { // when /checkout, localhost is 3000
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cartProducts })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url);
            }
        });
     }

    // async function checkout() {
       
    //     // Define fetch() options
    //     let options = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({items: cartProducts }) // pass cart items to the backend in stripe route
    //     // send server JSON ie. convert a JavaScript object into a string (when sending data to a web server, the data has to be a string)
    //     };

    //     try {
    //     let response = await fetch("http://localhost:5000/checkout", options); // checkout link as defined in stripe route
    //     if (response.ok) {
    //         await response.json(); // converts JSON to JavaScript for client
    //         if (response.url) {
    //             // assign will overwrite whatever user is looking at, and forward them to Stripe payment
    //             window.location.assign(response.url); 
    //         }
    //     } else {
    //         console.log(`Server error: ${response.status} ${response.statusText}`);
    //     }
    //     } catch (err) {
    //     console.log(`Network error: ${err.message}`);
    //     }
    // }

// use reduce method to get total amount of quantities to display in Cart button below
const productsCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar expand="sm">
        {/* determines where the Navbar collapses for mobile screens etc*/}
        
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>{" "}
        {/* Direct to homepage */}

        <Navbar.Toggle />{" "}
        {/* Allows us to have the element if in mobile screen, some things will collapse */}
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button> 
        </Navbar.Collapse>
      </Navbar>

        {/* Modal is the pop-up that will appear upon clicking Cart button */}
      <Modal show={show} onHide={handleClose}> {/* Modal has a show property that shows items in the cart */}
        <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {productsCount > 0 ?
            <>
            <p>Items in your cart:</p>
             {/* Map through items array, for each item send id, quantity, name and price prop to child CartProductModal */}
            {cartProducts.map((currentProduct, idx) => (
                <CartProductModal key={idx} id={currentProduct.id} 
                quantity={currentProduct.quantity}
                name={currentProduct.name}
                price={currentProduct.price}
                ></CartProductModal> 
            ))}

            {/* To get total, we call getTotalCostCb (function in App) from CartContext pipeline */}
            <h1>Total: {getTotalCostCb().toFixed(2)}</h1> 

            {/* This button will make a Stripe API call to an actual Stripe account */}
            <Button variant="success" onClick={checkout}>
                Purchase items!
            </Button>
            </>
            :
            <h1>No items in your cart.<br />Happy shopping!</h1>
            }

        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarShop;

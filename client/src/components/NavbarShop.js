import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import CartContext from "../CartContext";
import CartProductModal from "./CartProductModal";
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart

function NavbarShop() {
    // NOTE: cartProducts passed down by CartContext. Only cartProducts needed in this context
    // cartProducts state (see App) has four properties: id, quantity, name and price
    const { cartProducts, getTotalCostCb } = useContext(CartContext);

    const [show, setShow] = useState(false); // initially not show modal
    
    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

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
            <Button variant="success">
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

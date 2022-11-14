import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import CartContext from "../CartContext";
import CartProduct from "./CartProduct";
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart

function NavbarShop() {
    const { items,
        productData,
        getProductDataCb,
        getProductQuantityCb,
        addOneToCartCb,
        removeOneFromCartCb,
        deleteFromCartCb,
        getTotalCostCb } = useContext(CartContext);

    const [show, setShow] = useState(false); // initially not show modal
    
    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

    // function productData(id) {
    //     getProductDataCb(id);
    // }

// NOTE: items passed down by CartContext (which is also cartProducts state (see App), has two properties: id and quantity)
// use reduce method to get total amount of quantities to display in Cart button below
const productsCount = items.reduce((sum, product) => sum + product.quantity, 0);

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
            {items.map((currentProduct, idx) => (
                <CartProduct key={idx} id={currentProduct.id} 
                quantity={currentProduct.quantity}
                name={currentProduct.product_name}
                price={currentProduct.price}
                ></CartProduct> 
            ))}
            </>
            :
            <h1></h1>
            }

        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarShop;

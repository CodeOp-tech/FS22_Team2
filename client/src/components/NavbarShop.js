import React, { useState, useContext } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import CartContext from "../CartContext";
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart

function NavbarShop() {
    const contextObjCart = useContext(CartContext);

    const [show, setShow] = useState(false); // initially not show modal
    
    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

  return (
    <>
      <Navbar expand="sm">
        {/* determines where the Navbar collapses for mobile screens etc*/}
        
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>{" "}
        {/* Direct to homepage */}

        <Navbar.Toggle />{" "}
        {/* Allows us to have the element if in mobile screen, some things will collapse */}
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart 0 Items</Button>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}> {/* Modal has a show property that shows items in the cart */}
        <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarShop;

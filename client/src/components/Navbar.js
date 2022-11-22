import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import CartContext from "../CartContext";
import CartProductModal from "./CartProductModal";
import { FiShoppingCart } from "react-icons/fi";
import Local from "../helpers/Local";
// NOTE: React-bootstrap installed to simplify designing Navbar
// Modal element is when you click on the cart, and it shows the screen on top of the webpage showing all different data related to cart


function Navbar(props) {
    const { cartProducts, getTotalCostCb, totalCost, addPurchasesCb } = useContext(CartContext);

    const [show, setShow] = useState(false); // initially not show modal
    
    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
        getTotalCostCb();
    }

    async function handleClick() {
        Local.saveCartProducts(cartProducts);
        checkout();
        // NOTE: ACTUAL WORKFLOW SHOULD BE ONLY UPON RECEIVING SUCCESS PAGE, addPurchasesCb() is called
        // addPurchasesCb();
    }

     // POST to checkout
     const checkout = async() => {
        await fetch("http://localhost:5000/stripe/checkout", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cartProducts })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                console.log(response.url);
                window.location.assign(response.url);   
            }
        }) 
    }

// // use reduce method to get total amount of quantities to display in Cart button below
const productsCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <nav className="Navbar navbar navbar-expand-sm navbar-dark mb-4" style={{ backgroundColor: 'teal' }}>
            <div className="container-fluid">
                <span className="navbar-brand font-weight-bold">
                    <NavLink className="nav-link" to="/">
                        MSB, Inc.
                    </NavLink>
                </span>

                {/* Left-aligned stuff */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* public pages: visible to anyone visiting page */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shops">Online Store</NavLink>
                        </li>
                        
                        {/* user pages: only visible to logged in users */}
                        {
                            props.user && (
                                <li>
                                    <NavLink className="nav-link" to="/customer_purchases">Purchase History</NavLink>
                                </li>
                            )
                        }
                        {/* 
                            props.user && (
                                <li className="nav-item">
                                    ADD USER DASH HERE
                                </li>
                            )
                        */}
                        {
                            props.user && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/users/${props.user.user_id}`}>Profile ({props.user.username})</NavLink>
                                </li>
                            )
                        }

                        {/* seller pages: only visible to logged in users who have shops */}
                        {/* NOTE FROM ZOE TO JESS: Changed "Shops: Purchase History" to "Sales History" */}
                        {
                            props.shop && (
                                <li>
                                    <NavLink className="nav-link" to="/seller">My Shop</NavLink>
                                </li>
                            )
                        }
                        {
                            props.shop && (
                                <li>
                                    <NavLink className="nav-link" to="/shop_purchases">Sales History</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </div>

               
    
         <Button onClick={handleShow}><FiShoppingCart /> ({productsCount} items)</Button>
       

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
            <h1>Total: {totalCost}</h1> 

            {/* This button will make a Stripe API call to an actual Stripe account */}
            <Button variant="success" onClick={() => handleClick()}>
                Purchase items!
            </Button>
            </>
            :
            <h1>No items in your cart.<br />Happy shopping!</h1>
            }

        </Modal.Body>
      </Modal>

                {/* Login/Logout: right-aligned, based on whether user is logged in */}
                {
                    props.user
                        ?   
                            (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        {/* Log out user. Then go to home page. */}
                                        <Link className="nav-link" to="/" onClick={props.logoutCb}>Logout</Link>
                                    </li>
                                </ul>
                            )
                        :
                            (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </ul>
                            )
                }
            </div>
        </nav>
    );
}

export default Navbar;


import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";


function Navbar(props) {

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
                        
                        {/* USER PAGES: only visible to logged in users */}
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

                        {/* SELLER PAGES: only visible to logged in users who have shops */}
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

                {/* Login/Logout: right-aligned, based on whether user is logged in */}
                {
                    props.user
                        ?   
                        (
                                <ul className="navbar-nav">
                                     <li className="nav-item">
                                        <NavLink className="nav-link" to={`/users/${props.user.user_id}`}>Profile ({props.user.username})</NavLink>
                                    </li>
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


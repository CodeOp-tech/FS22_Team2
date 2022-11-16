import React, {useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';

function NavBar(props) {

    return (
        <nav className="Navbar navbar navbar-expand-sm navbar-dark mb-4" style={{ backgroundColor: 'teal' }}>
            <div className="container-fluid">
                <span className="navbar-brand font-weight-bold">MSB, Inc.</span>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Left-aligned stuff */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>


                         {/* Only show "Shop" if user is logged in */}
                         {
                            props.user && (
                                <li>
                                    <NavLink className="nav-link" to="/shop">Shop</NavLink>
                                </li>
                            )
                        }
                        
                        {/* NOTE FROM JESS TO ZOE: Need to authorize only customers here */}
                        {/* Only show "Customer Purchase History" if customer is logged in */}
                        {
                            props.user && (
                                <li>
                                    <NavLink className="nav-link" to="/customer_purchases">Purchase History</NavLink>
                                </li>
                            )
                        }

                        {/* NOTE FROM JESS TO ZOE: Need to authorize only shops/sellers here
                        Please feel free to modify title of "Shops: Purchase History" - just to differentiate for now */}
                        {/* Only show "Buyer Purchase History" if buyer is logged in */}
                        {
                            props.user && (
                                <li>
                                    <NavLink className="nav-link" to="/shop_purchases">Shops: Purchase History</NavLink>
                                </li>
                            )
                        }

                        <li>
                            <NavLink className="nav-link" to="/shop">Shop</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/seller">Seller</NavLink>
                        </li>

                        {/* Only show "Members Only" if user is logged in */}
                        {
                            props.user && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/members-only">Members Only</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </div>

                {/* Right-aligned stuff, based on whether user is logged in */}
                {
                    props.user
                        ?   
                            (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={`/users/${props.user.id}`}>Profile ({props.user.username})</NavLink>
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
                                </ul>
                            )
                }
            </div>
        </nav>
    );
}

export default NavBar;
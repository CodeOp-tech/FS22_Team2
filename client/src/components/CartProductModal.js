// Video tutorial from: https://www.youtube.com/watch?v=_8M-YVY76O8&ab_channel=TraversyMedia
// NOTE: CartProductModal is a child/lives within the Navbar component

import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import CartContext from "../CartContext";

function CartProductModal(props) { // props received from parent Navbar

    // NOTE: Only deleteFromCartCb needed in this context
    const { deleteFromCartCb } = useContext(CartContext);

return (
    <>
        <h3>{props.name}</h3>
        <p>{props.quantity}</p>
        <p>${ (props.quantity * props.price).toFixed(2) }</p>
        <Button size="sm" onClick={() => deleteFromCartCb(props.id)}>Remove</Button>
        <hr></hr> {/* hr = line break */}
    </>
)

}

export default CartProductModal;